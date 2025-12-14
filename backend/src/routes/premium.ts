// import express from 'express';
// import Profile from '../models/Profile.js';
// import User from '../models/User.js';
// import { authMiddleware } from '../middleware/auth.js';

// const router = express.Router();

// // Get premium features info
// router.get('/features', async (req, res) => {
//   try {
//     const features = {
//       regular: {
//         name: 'Free',
//         price: 0,
//         features: [
//           '5 gallery images',
//           'Basic customization',
//           'Profile analytics',
//           'Standard support',
//           'Preset themes only',
//           'Standard profile card'
//         ]
//       },
//       premium: {
//         name: 'Premium',
//         price: 9.99,
//         period: 'month',
//         features: [
//           '20 gallery images',
//           'Advanced customization',
//           'Full analytics dashboard',
//           'Priority support',
//           'Custom colors & themes',
//           'Custom CSS support',
//           'Custom profile card image',
//           'Custom background image',
//           'Remove Starlit branding',
//           'Ad-free experience',
//           'Verification badge',
//           'Featured placement priority',
//           'Custom domain support (coming soon)',
//           'Advanced card styles',
//           'Particle effects',
//           'Custom badges'
//         ]
//       }
//     };
    
//     res.json(features);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Check user's premium status
// router.get('/status', authMiddleware, async (req: any, res) => {
//   try {
//     const profile = await Profile.findOne({ userId: req.user._id });
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
    
//     const isPremiumActive = profile.isPremium && 
//       (!profile.premiumExpiry || new Date(profile.premiumExpiry) > new Date());
    
//     res.json({
//       isPremium: isPremiumActive,
//       premiumExpiry: profile.premiumExpiry,
//       features: profile.premiumFeatures,
//       daysRemaining: profile.premiumExpiry 
//         ? Math.ceil((new Date(profile.premiumExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
//         : null
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Activate premium (placeholder for payment integration)
// router.post('/activate', authMiddleware, async (req: any, res) => {
//   try {
//     const { duration = 30 } = req.body; // days
    
//     const profile = await Profile.findOne({ userId: req.user._id });
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
    
//     // Calculate expiry date
//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + duration);
    
//     profile.isPremium = true;
//     profile.premiumExpiry = expiryDate;
//     profile.premiumFeatures = {
//       unlimitedImages: true,
//       customDomain: true,
//       prioritySupport: true,
//       analyticsAccess: true,
//       customBranding: true,
//       adFree: true
//     };
    
//     await profile.save();
    
//     res.json({
//       message: 'Premium activated successfully',
//       expiresAt: expiryDate,
//       features: profile.premiumFeatures
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Cancel premium
// router.post('/cancel', authMiddleware, async (req: any, res) => {
//   try {
//     const profile = await Profile.findOne({ userId: req.user._id });
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
    
//     profile.isPremium = false;
//     profile.premiumExpiry = undefined;
//     profile.premiumFeatures = {
//       unlimitedImages: false,
//       customDomain: false,
//       prioritySupport: false,
//       analyticsAccess: false,
//       customBranding: false,
//       adFree: false
//     };
    
//     await profile.save();
    
//     res.json({
//       message: 'Premium cancelled successfully'
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Grant premium (admin only)
// router.post('/grant/:userId', authMiddleware, async (req: any, res) => {
//   try {
//     // Check if requester is admin (add admin middleware here)
//     const { duration = 30 } = req.body;
    
//     const profile = await Profile.findOne({ userId: req.params.userId });
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
    
//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + duration);
    
//     profile.isPremium = true;
//     profile.premiumExpiry = expiryDate;
//     await profile.save();
    
//     res.json({
//       message: 'Premium granted successfully',
//       expiresAt: expiryDate
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;

import express from 'express';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get premium features info
router.get('/features', async (req, res) => {
  try {
    const features = {
      regular: {
        name: 'Free',
        price: 0,
        features: [
          '5 gallery images',
          'Basic customization',
          'Profile analytics',
          'Standard support',
          'Preset themes only',
          'Standard profile card'
        ]
      },
      premium: {
        name: 'Premium',
        price: 9.99,
        period: 'month',
        features: [
          '20 gallery images',
          'Advanced customization',
          'Full analytics dashboard',
          'Priority support',
          'Custom colors & themes',
          'Custom CSS support',
          'Custom profile card image',
          'Custom background image',
          'Remove Starlit branding',
          'Ad-free experience',
          'Verification badge',
          'Featured placement priority',
          'Custom domain support (coming soon)',
          'Advanced card styles',
          'Particle effects',
          'Custom badges'
        ]
      }
    };
    
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Check user's premium status
router.get('/status', authMiddleware, async (req: any, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const isPremiumActive = profile.isPremium && 
      (!profile.premiumExpiry || new Date(profile.premiumExpiry) > new Date());
    
    res.json({
      isPremium: isPremiumActive,
      premiumExpiry: profile.premiumExpiry,
      features: profile.premiumFeatures,
      daysRemaining: profile.premiumExpiry 
        ? Math.ceil((new Date(profile.premiumExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Activate premium (placeholder for payment integration)
router.post('/activate', authMiddleware, async (req: any, res) => {
  try {
    const { duration = 30 } = req.body; // days
    
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + duration);
    
    profile.isPremium = true;
    profile.premiumExpiry = expiryDate;
    profile.premiumFeatures = {
      unlimitedImages: true,
      customDomain: true,
      prioritySupport: true,
      analyticsAccess: true,
      customBranding: true,
      adFree: true
    };
    
    await profile.save();
    
    res.json({
      message: 'Premium activated successfully',
      expiresAt: expiryDate,
      features: profile.premiumFeatures
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel premium
router.post('/cancel', authMiddleware, async (req: any, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    profile.isPremium = false;
    profile.premiumExpiry = undefined;
    profile.premiumFeatures = {
      unlimitedImages: false,
      customDomain: false,
      prioritySupport: false,
      analyticsAccess: false,
      customBranding: false,
      adFree: false
    };
    
    await profile.save();
    
    res.json({
      message: 'Premium cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Grant premium (admin only)
router.post('/grant/:userId', authMiddleware, async (req: any, res) => {
  try {
    // Check if requester is admin (add admin middleware here)
    const { duration = 30 } = req.body;
    
    const profile = await Profile.findOne({ userId: req.params.userId });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + duration);
    
    profile.isPremium = true;
    profile.premiumExpiry = expiryDate;
    await profile.save();
    
    res.json({
      message: 'Premium granted successfully',
      expiresAt: expiryDate
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;