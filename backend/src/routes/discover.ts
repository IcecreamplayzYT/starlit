import express from 'express';
import Profile from '../models/Profile.js';
import ProfileView from '../models/ProfileView.js';
import Like from '../models/Like.js';
import WeeklyStats from '../models/WeeklyStats.js';

const router = express.Router();

// Get start of current week (Sunday)
function getWeekStart(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day;
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

// Get profiles with sorting/filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category = 'popular',
      search,
      role,
      tool,
      page = 1,
      limit = 20
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    const weekStart = getWeekStart();
    
    // Build base query
    let query: any = { approved: true };
    
    if (search) {
      query.$text = { $search: search as string };
    }
    
    if (role) {
      query.$or = [
        { role: role },
        { roles: role }
      ];
    }
    
    if (tool) {
      query.tools = tool;
    }
    
    let sortOptions: any = {};
    
    switch (category) {
      case 'popular':
        // Combination of likes and views
        sortOptions = { likes: -1, views: -1, createdAt: -1 };
        break;
      case 'up-and-coming':
        // New profiles with some engagement
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        query.createdAt = { $gte: thirtyDaysAgo };
        sortOptions = { likes: -1, views: -1 };
        break;
      case 'most-viewed-week':
        sortOptions = { weeklyViews: -1 };
        break;
      case 'most-liked-week':
        sortOptions = { weeklyLikes: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'featured':
        query.featured = true;
        sortOptions = { featuredUntil: -1 };
        break;
      default:
        sortOptions = { likes: -1, views: -1, createdAt: -1 };
    }
    
    const profiles = await Profile.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-passwordHash');
    
    const total = await Profile.countDocuments(query);
    
    res.json({
      profiles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Discover error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get available roles for filtering
router.get('/roles', async (req, res) => {
  try {
    const roles = await Profile.distinct('role', { approved: true });
    const multiRoles = await Profile.distinct('roles', { approved: true });
    const allRoles = [...new Set([...roles, ...multiRoles])].filter(Boolean).sort();
    res.json(allRoles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get available tools for filtering
router.get('/tools', async (req, res) => {
  try {
    const tools = await Profile.distinct('tools', { approved: true });
    res.json(tools.filter(Boolean).sort());
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset weekly stats (should be called by a cron job every Sunday)
router.post('/reset-weekly', async (req, res) => {
  try {
    // Archive current stats
    const weekStart = getWeekStart();
    const profiles = await Profile.find({ approved: true });
    
    for (const profile of profiles) {
      await WeeklyStats.findOneAndUpdate(
        { profileId: profile._id, weekStart },
        { 
          views: profile.weeklyViews,
          likes: profile.weeklyLikes,
          updatedAt: new Date()
        },
        { upsert: true }
      );
    }
    
    // Reset all weekly counters
    await Profile.updateMany({}, { weeklyViews: 0, weeklyLikes: 0 });
    
    res.json({ message: 'Weekly stats reset' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
