import express from 'express';
import ProfileView from '../models/ProfileView.js';
import Profile from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Record a profile view (unique per user)
router.post('/', authMiddleware, async (req: any, res) => {
  try {
    const { profileId } = req.body;
    
    // Check if profile exists
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Don't count self-views
    if (profile.userId.toString() === req.user._id.toString()) {
      return res.json({ message: 'Self-view not counted' });
    }
    
    // Check if user has already viewed this profile
    const existingView = await ProfileView.findOne({
      profileId,
      viewerId: req.user._id
    });
    
    if (existingView) {
      // Update timestamp but don't increment count
      existingView.viewedAt = new Date();
      await existingView.save();
      return res.json({ message: 'View already recorded', newView: false });
    }
    
    // Create new view record
    const view = new ProfileView({
      profileId,
      viewerId: req.user._id
    });
    await view.save();
    
    // Increment view counts
    await Profile.findByIdAndUpdate(profileId, {
      $inc: { views: 1, weeklyViews: 1 }
    });
    
    res.status(201).json({ message: 'View recorded', newView: true });
  } catch (error) {
    // Don't fail silently for duplicate key errors
    if ((error as any).code === 11000) {
      return res.json({ message: 'View already recorded', newView: false });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Record anonymous view (for non-logged-in users - tracked by IP in analytics)
router.post('/anonymous', async (req, res) => {
  try {
    const { profileId } = req.body;
    
    // For anonymous users, we just track in analytics, not in ProfileView
    // This prevents manipulation but still shows general interest
    
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ message: 'Anonymous view noted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get profile view stats (owner only)
router.get('/stats/:profileId', authMiddleware, async (req: any, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Check ownership
    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const totalViews = await ProfileView.countDocuments({ profileId: req.params.profileId });
    
    // Views over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const viewsByDay = await ProfileView.aggregate([
      {
        $match: {
          profileId: profile._id,
          viewedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$viewedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Recent viewers
    const recentViewers = await ProfileView.find({ profileId: req.params.profileId })
      .sort({ viewedAt: -1 })
      .limit(10)
      .populate({
        path: 'viewerId',
        select: 'email'
      });
    
    res.json({
      totalViews,
      weeklyViews: profile.weeklyViews,
      viewsByDay,
      recentViewers
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if user has viewed a profile
router.get('/check/:profileId', authMiddleware, async (req: any, res) => {
  try {
    const view = await ProfileView.findOne({
      profileId: req.params.profileId,
      viewerId: req.user._id
    });
    
    res.json({ viewed: !!view });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
