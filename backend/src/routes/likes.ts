import express from 'express';
import Like from '../models/Like.js';
import Profile from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Like a profile
router.post('/', authMiddleware, async (req: any, res) => {
  try {
    const { profileId } = req.body;
    
    // Check if already liked
    const existingLike = await Like.findOne({
      userId: req.user._id,
      profileId
    });
    
    if (existingLike) {
      return res.status(400).json({ error: 'Already liked' });
    }
    
    const like = new Like({
      userId: req.user._id,
      profileId
    });
    
    await like.save();
    
    // Increment likes count on profile
    await Profile.findByIdAndUpdate(profileId, {
      $inc: { likes: 1 }
    });
    
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Unlike a profile
router.delete('/:profileId', authMiddleware, async (req: any, res) => {
  try {
    const like = await Like.findOneAndDelete({
      userId: req.user._id,
      profileId: req.params.profileId
    });
    
    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }
    
    // Decrement likes count on profile
    await Profile.findByIdAndUpdate(req.params.profileId, {
      $inc: { likes: -1 }
    });
    
    res.json({ message: 'Unliked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get likes for a profile
router.get('/profile/:profileId', async (req, res) => {
  try {
    const likes = await Like.find({ profileId: req.params.profileId })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's liked profiles
router.get('/user', authMiddleware, async (req: any, res) => {
  try {
    const likes = await Like.find({ userId: req.user._id })
      .populate('profileId');
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Check if user has liked a profile
router.get('/check/:profileId', authMiddleware, async (req: any, res) => {
  try {
    const like = await Like.findOne({
      userId: req.user._id,
      profileId: req.params.profileId
    });
    res.json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
