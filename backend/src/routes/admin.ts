import express from 'express';
import Profile from '../models/Profile.js';
import UserRole from '../models/UserRole.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Check if user is admin
const adminMiddleware = async (req: any, res: any, next: any) => {
  try {
    const userRole = await UserRole.findOne({ userId: req.user._id, role: 'admin' });
    if (!userRole) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all profiles (admin only)
router.get('/profiles', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve profile (admin only)
router.put('/profiles/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject/delete profile (admin only)
router.delete('/profiles/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ message: 'Profile rejected and deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;