// import express from 'express';
// import Profile from '../models/Profile.js';
// import UserRole from '../models/UserRole.js';
// import { authMiddleware } from '../middleware/auth.js';

// const router = express.Router();

// // Check if user is admin
// const adminMiddleware = async (req: any, res: any, next: any) => {
//   try {
//     const userRole = await UserRole.findOne({ userId: req.user._id, role: 'admin' });
//     if (!userRole) {
//       return res.status(403).json({ error: 'Admin access required' });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get all profiles (admin only)
// router.get('/profiles', authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const profiles = await Profile.find()
//       .populate('userId', 'email')
//       .sort({ createdAt: -1 });
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Approve profile (admin only)
// router.put('/profiles/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const profile = await Profile.findByIdAndUpdate(
//       req.params.id,
//       { approved: true },
//       { new: true }
//     );
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
    
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Reject/delete profile (admin only)
// router.delete('/profiles/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const profile = await Profile.findByIdAndDelete(req.params.id);
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
    
//     res.json({ message: 'Profile rejected and deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;

import express from 'express';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
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

// Update profile (admin only)
router.patch('/profiles/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { username, displayName, slug, headline, bio, description, location, website } = req.body;
    
    // Check if slug is being changed and if it's already taken
    if (slug) {
      const existingSlug = await Profile.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingSlug) {
        return res.status(400).json({ error: 'Slug already taken' });
      }
    }

    // Check if username is being changed and if it's already taken
    if (username) {
      const existingUsername = await Profile.findOne({ username, _id: { $ne: req.params.id } });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { username, displayName, slug, headline, bio, description, location, website },
      { new: true, runValidators: true }
    ).populate('userId', 'email');

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Update user email (admin only)
router.patch('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email is already taken
    const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already taken' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Delete profile (admin only)
router.delete('/profiles/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user roles (admin only)
router.get('/users/:id/roles', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const roles = await UserRole.find({ userId: req.params.id });
    res.json(roles.map(r => r.role));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add role to user (admin only)
router.post('/users/:id/roles', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['admin', 'designer', 'hirer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if role already exists
    const existingRole = await UserRole.findOne({ userId: req.params.id, role });
    if (existingRole) {
      return res.status(400).json({ error: 'Role already exists' });
    }

    const userRole = new UserRole({
      userId: req.params.id,
      role
    });
    
    await userRole.save();
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove role from user (admin only)
router.delete('/users/:id/roles/:role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userRole = await UserRole.findOneAndDelete({
      userId: req.params.id,
      role: req.params.role
    });

    if (!userRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json({ message: 'Role removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;