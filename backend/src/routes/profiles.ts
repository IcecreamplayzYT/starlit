import express from 'express';
import { z } from 'zod';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const createProfileSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  headline: z.string().optional(),
  bio: z.string().max(500).optional(),
  role: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  tools: z.array(z.string()).optional()
});

const updateProfileSchema = createProfileSchema.partial();

// Create profile
router.post('/', authMiddleware, async (req: any, res) => {
  try {
    const data = createProfileSchema.parse(req.body);

    // Check if user already has a profile
    const existingProfile = await Profile.findOne({ userId: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    // Check if slug is taken
    const existingSlug = await Profile.findOne({ slug: data.slug });
    if (existingSlug) {
      return res.status(400).json({ error: 'Slug already taken' });
    }

    const profile = new Profile({
      ...data,
      userId: req.user._id
    });
    
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get approved profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find({ approved: true })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get profile by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const profile = await Profile.findOne({ slug: req.params.slug })
      .populate('userId', 'email');
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const projects = await Project.find({ profileId: profile._id });
    
    res.json({ ...profile.toObject(), projects });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user's profile
router.get('/me', authMiddleware, async (req: any, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile
router.patch('/:id', authMiddleware, async (req: any, res) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Check ownership
    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check slug uniqueness if updating
    if (data.slug && data.slug !== profile.slug) {
      const existingSlug = await Profile.findOne({ slug: data.slug });
      if (existingSlug) {
        return res.status(400).json({ error: 'Slug already taken' });
      }
    }

    Object.assign(profile, data);
    await profile.save();
    
    res.json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;