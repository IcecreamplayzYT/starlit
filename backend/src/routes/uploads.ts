import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import {
  uploadProfilePicture,
  uploadBackground,
  uploadAudio,
  uploadCursor,
  deleteFromCloudinary
} from '../config/cloudinary.js';

const router = express.Router();

// Helper to check profile ownership
const checkProfileOwnership = async (req: any, res: any) => {
  const profile = await Profile.findOne({ userId: req.user._id });
  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return null;
  }
  return profile;
};

// Upload avatar
router.post('/avatar', authMiddleware, uploadProfilePicture.single('file'), async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Delete old avatar if exists
    if (profile.avatarUrl) {
      await deleteFromCloudinary(profile.avatarUrl);
    }

    // Cloudinary URL is in req.file.path
    const url = (req.file as any).path;
    profile.avatarUrl = url;
    await profile.save();

    res.json({ url });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Upload background
router.post('/background', authMiddleware, uploadBackground.single('file'), async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check limits
    const maxBackgrounds = profile.isPremium ? 3 : 1;
    if ((profile.backgrounds?.length || 0) >= maxBackgrounds) {
      return res.status(400).json({ 
        error: `Maximum ${maxBackgrounds} background${maxBackgrounds > 1 ? 's' : ''} allowed. ${!profile.isPremium ? 'Upgrade to premium for more.' : ''}` 
      });
    }

    const url = (req.file as any).path;
    const position = req.body.position || 'center';

    if (!profile.backgrounds) {
      profile.backgrounds = [];
    }
    profile.backgrounds.push({ url, position });
    await profile.save();

    res.json({ url, index: profile.backgrounds.length - 1 });
  } catch (error) {
    console.error('Background upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Delete background
router.delete('/background/:index', authMiddleware, async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= (profile.backgrounds?.length || 0)) {
      return res.status(400).json({ error: 'Invalid background index' });
    }

    const bgToDelete = profile.backgrounds![index];
    await deleteFromCloudinary(bgToDelete.url);

    profile.backgrounds!.splice(index, 1);
    await profile.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Background delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Upload audio
router.post('/audio', authMiddleware, uploadAudio.single('file'), async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check limits
    const maxAudios = profile.isPremium ? 5 : 3;
    if ((profile.audios?.length || 0) >= maxAudios) {
      return res.status(400).json({ 
        error: `Maximum ${maxAudios} audio tracks allowed. ${!profile.isPremium ? 'Upgrade to premium for more.' : ''}` 
      });
    }

    const url = (req.file as any).path;
    const name = req.body.name || `Track ${(profile.audios?.length || 0) + 1}`;

    if (!profile.audios) {
      profile.audios = [];
    }
    profile.audios.push({ url, name });
    await profile.save();

    res.json({ url, name, index: profile.audios.length - 1 });
  } catch (error) {
    console.error('Audio upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Delete audio
router.delete('/audio/:index', authMiddleware, async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= (profile.audios?.length || 0)) {
      return res.status(400).json({ error: 'Invalid audio index' });
    }

    const audioToDelete = profile.audios![index];
    await deleteFromCloudinary(audioToDelete.url);

    profile.audios!.splice(index, 1);
    await profile.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Audio delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Upload cursor (premium only)
router.post('/cursor', authMiddleware, uploadCursor.single('file'), async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    if (!profile.isPremium) {
      return res.status(403).json({ error: 'Custom cursors are a premium feature' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const cursorType = req.body.type || 'default'; // 'default' or 'pointer'

    // Delete old cursor if exists
    if (cursorType === 'pointer' && profile.customPointerCursor) {
      await deleteFromCloudinary(profile.customPointerCursor);
    } else if (cursorType === 'default' && profile.customCursor) {
      await deleteFromCloudinary(profile.customCursor);
    }

    const url = (req.file as any).path;
    
    if (cursorType === 'pointer') {
      profile.customPointerCursor = url;
    } else {
      profile.customCursor = url;
    }
    await profile.save();

    res.json({ url, type: cursorType });
  } catch (error) {
    console.error('Cursor upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Delete cursor
router.delete('/cursor/:type', authMiddleware, async (req: any, res) => {
  try {
    const profile = await checkProfileOwnership(req, res);
    if (!profile) return;

    const cursorType = req.params.type; // 'default' or 'pointer'

    if (cursorType === 'pointer' && profile.customPointerCursor) {
      await deleteFromCloudinary(profile.customPointerCursor);
      profile.customPointerCursor = undefined;
    } else if (cursorType === 'default' && profile.customCursor) {
      await deleteFromCloudinary(profile.customCursor);
      profile.customCursor = undefined;
    }

    await profile.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Cursor delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
