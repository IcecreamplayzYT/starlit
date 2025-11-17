import express from 'express';
import { z } from 'zod';
import Project from '../models/Project.js';
import Profile from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const createProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  year: z.number().optional(),
  externalLink: z.string().url().optional().or(z.literal(''))
});

const updateProjectSchema = createProjectSchema.partial();

// Create project
router.post('/', authMiddleware, async (req: any, res) => {
  try {
    const data = createProjectSchema.parse(req.body);
    
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const project = new Project({
      ...data,
      profileId: profile._id
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Get projects for profile
router.get('/profile/:profileId', async (req, res) => {
  try {
    const projects = await Project.find({ profileId: req.params.profileId })
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project
router.patch('/:id', authMiddleware, async (req: any, res) => {
  try {
    const data = updateProjectSchema.parse(req.body);
    
    const project = await Project.findById(req.params.id)
      .populate('profileId');
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check ownership
    if ((project.profileId as any).userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    Object.assign(project, data);
    await project.save();
    
    res.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project
router.delete('/:id', authMiddleware, async (req: any, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('profileId');
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check ownership
    if ((project.profileId as any).userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;