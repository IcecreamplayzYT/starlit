// // import express from 'express';
// // import { z } from 'zod';
// // import Profile from '../models/Profile.js';
// // import Project from '../models/Project.js';
// // import { authMiddleware } from '../middleware/auth.js';

// // const router = express.Router();

// // const createProfileSchema = z.object({
// //   name: z.string().min(1),
// //   slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
// //   headline: z.string().optional(),
// //   bio: z.string().max(500).optional(),
// //   role: z.string().optional(),
// //   location: z.string().optional(),
// //   website: z.string().url().optional().or(z.literal('')),
// //   tools: z.array(z.string()).optional()
// // });

// // const updateProfileSchema = createProfileSchema.partial();

// // // Create profile
// // router.post('/', authMiddleware, async (req: any, res) => {
// //   try {
// //     const data = createProfileSchema.parse(req.body);

// //     // Check if user already has a profile
// //     const existingProfile = await Profile.findOne({ userId: req.user._id });
// //     if (existingProfile) {
// //       return res.status(400).json({ error: 'Profile already exists' });
// //     }

// //     // Check if slug is taken
// //     const existingSlug = await Profile.findOne({ slug: data.slug });
// //     if (existingSlug) {
// //       return res.status(400).json({ error: 'Slug already taken' });
// //     }

// //     const profile = new Profile({
// //       ...data,
// //       userId: req.user._id
// //     });
    
// //     await profile.save();
// //     res.status(201).json(profile);
// //   } catch (error) {
// //     if (error instanceof z.ZodError) {
// //       return res.status(400).json({ error: error.errors[0].message });
// //     }
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Get approved profiles
// // router.get('/', async (req, res) => {
// //   try {
// //     const profiles = await Profile.find({ approved: true })
// //       .populate('userId', 'email')
// //       .sort({ createdAt: -1 });
// //     res.json(profiles);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Get profile by slug
// // router.get('/slug/:slug', async (req, res) => {
// //   try {
// //     const profile = await Profile.findOne({ slug: req.params.slug })
// //       .populate('userId', 'email');
    
// //     if (!profile) {
// //       return res.status(404).json({ error: 'Profile not found' });
// //     }

// //     const projects = await Project.find({ profileId: profile._id });
    
// //     res.json({ ...profile.toObject(), projects });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Get current user's profile
// // router.get('/me', authMiddleware, async (req: any, res) => {
// //   try {
// //     const profile = await Profile.findOne({ userId: req.user._id });
// //     if (!profile) {
// //       return res.status(404).json({ error: 'Profile not found' });
// //     }
// //     res.json(profile);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Update profile
// // router.patch('/:id', authMiddleware, async (req: any, res) => {
// //   try {
// //     const data = updateProfileSchema.parse(req.body);
    
// //     const profile = await Profile.findById(req.params.id);
// //     if (!profile) {
// //       return res.status(404).json({ error: 'Profile not found' });
// //     }

// //     // Check ownership
// //     if (profile.userId.toString() !== req.user._id.toString()) {
// //       return res.status(403).json({ error: 'Access denied' });
// //     }

// //     // Check slug uniqueness if updating
// //     if (data.slug && data.slug !== profile.slug) {
// //       const existingSlug = await Profile.findOne({ slug: data.slug });
// //       if (existingSlug) {
// //         return res.status(400).json({ error: 'Slug already taken' });
// //       }
// //     }

// //     Object.assign(profile, data);
// //     await profile.save();
    
// //     res.json(profile);
// //   } catch (error) {
// //     if (error instanceof z.ZodError) {
// //       return res.status(400).json({ error: error.errors[0].message });
// //     }
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // export default router;


// // backend/src/routes/profiles.ts
// import express from 'express';
// import { z } from 'zod';
// import Profile from '../models/Profile.js';
// import Project from '../models/Project.js';
// import { authMiddleware } from '../middleware/auth.js';

// const router = express.Router();

// const createProfileSchema = z.object({
//   username: z.string().min(1).regex(/^[a-z0-9-]+$/),
//   displayName: z.string().min(1),
//   slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
//   headline: z.string().optional(),
//   bio: z.string().max(500).optional(),
//   description: z.string().max(1000).optional(),
//   role: z.string().optional(),
//   location: z.string().optional(),
//   website: z.string().url().optional().or(z.literal('')),
//   tools: z.array(z.string()).optional(),
//   avatarUrl: z.string().url().optional().or(z.literal('')),
//   bannerUrl: z.string().url().optional().or(z.literal('')),
//   profileImages: z.array(z.string().url()).max(5).optional(),
//   contactMethods: z.array(z.object({
//     type: z.enum(['email', 'phone', 'discord', 'telegram', 'other']),
//     value: z.string(),
//     label: z.string().optional()
//   })).optional(),
//   customization: z.object({
//     primaryColor: z.string().optional(),
//     secondaryColor: z.string().optional(),
//     positioning: z.enum(['left', 'center', 'right']).optional(),
//     theme: z.enum(['blue', 'purple', 'green', 'red', 'orange']).optional()
//   }).optional()
// });

// const updateProfileSchema = createProfileSchema.partial();

// // Create profile
// router.post('/', authMiddleware, async (req: any, res) => {
//   try {
//     const data = createProfileSchema.parse(req.body);

//     // Check if user already has a profile
//     const existingProfile = await Profile.findOne({ userId: req.user._id });
//     if (existingProfile) {
//       return res.status(400).json({ error: 'Profile already exists' });
//     }

//     // Check if username is taken
//     const existingUsername = await Profile.findOne({ username: data.username });
//     if (existingUsername) {
//       return res.status(400).json({ error: 'Username already taken' });
//     }

//     // Check if slug is taken
//     const existingSlug = await Profile.findOne({ slug: data.slug });
//     if (existingSlug) {
//       return res.status(400).json({ error: 'Slug already taken' });
//     }

//     // Check image limits
//     if (data.profileImages && data.profileImages.length > 5) {
//       return res.status(400).json({ error: 'Regular users can only have up to 5 images' });
//     }

//     const profile = new Profile({
//       ...data,
//       userId: req.user._id,
//       displayName: data.displayName || data.username,
//       approved: true  // Auto-approve profiles
//     });
    
//     await profile.save();
//     res.status(201).json(profile);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ error: error.errors[0].message });
//     }
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get approved profiles
// router.get('/', async (req, res) => {
//   try {
//     const profiles = await Profile.find({ approved: true })
//       .populate('userId', 'email')
//       .sort({ createdAt: -1 });
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get profile by slug
// router.get('/slug/:slug', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ slug: req.params.slug })
//       .populate('userId', 'email');
    
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }

//     const projects = await Project.find({ profileId: profile._id });
    
//     res.json({ ...profile.toObject(), projects });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get current user's profile
// router.get('/me', authMiddleware, async (req: any, res) => {
//   try {
//     const profile = await Profile.findOne({ userId: req.user._id });
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update profile
// router.patch('/:id', authMiddleware, async (req: any, res) => {
//   try {
//     const data = updateProfileSchema.parse(req.body);
    
//     const profile = await Profile.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }

//     // Check ownership
//     if (profile.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     // Check username uniqueness if updating
//     if (data.username && data.username !== profile.username) {
//       const existingUsername = await Profile.findOne({ username: data.username });
//       if (existingUsername) {
//         return res.status(400).json({ error: 'Username already taken' });
//       }
//     }

//     // Check slug uniqueness if updating
//     if (data.slug && data.slug !== profile.slug) {
//       const existingSlug = await Profile.findOne({ slug: data.slug });
//       if (existingSlug) {
//         return res.status(400).json({ error: 'Slug already taken' });
//       }
//     }

//     // Check image limits
//     if (data.profileImages) {
//       const maxImages = profile.isPremium ? 10 : 5;
//       if (data.profileImages.length > maxImages) {
//         return res.status(400).json({ 
//           error: `You can only have up to ${maxImages} images. ${profile.isPremium ? '' : 'Upgrade to premium for 10 images.'}` 
//         });
//       }
//     }

//     Object.assign(profile, data);
//     await profile.save();
    
//     res.json(profile);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ error: error.errors[0].message });
//     }
//     res.status(500).json({ error: 'Server error' });
//   }
// });

import express from 'express';
import { z } from 'zod';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';
import {
  validateProfileContent,
  validateImageUrls,
} from '../utils/moderation.js';

const router = express.Router();

const verificationBadgeEnum = z.enum(['none', 'verified', 'moderator']);

const createProfileSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(30)
    .regex(/^[a-z0-9-]+$/, 'Username can only contain lowercase letters, numbers, and dashes'),
  displayName: z.string().min(1).max(50),
  slug: z.string().min(1).max(30).regex(/^[a-z0-9-]+$/),
  headline: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  description: z.string().max(1000).optional(),
  role: z.string().optional(),
  roles: z.array(z.string()).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional().or(z.literal('')),
  tools: z.array(z.string()).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  bannerUrl: z.string().url().optional().or(z.literal('')),
  profileImages: z.array(z.string().url()).max(5).optional(),
  contactMethods: z
    .array(
      z.object({
        type: z.enum(['email', 'phone', 'discord', 'telegram', 'other']),
        value: z.string(),
        label: z.string().optional(),
      })
    )
    .optional(),
  customization: z
    .object({
      // Legacy fields
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional(),
      positioning: z.enum(['left', 'center', 'right']).optional(),
      fontStyle: z.enum(['sans-serif', 'serif', 'monospace']).optional(),
      cardStyle: z.enum(['modern', 'minimal', 'glassmorphism', 'neumorphism']).optional(),
      shadowIntensity: z.enum(['none', 'light', 'medium', 'heavy']).optional(),
      animationSpeed: z.enum(['none', 'slow', 'normal', 'fast']).optional(),
      enableParticles: z.boolean().optional(),
      showSocialIcons: z.boolean().optional(),
      compactMode: z.boolean().optional(),
      hideStats: z.boolean().optional(),
      customCSS: z.string().optional(),

      // General Settings
      avatarRadius: z.number().min(0).max(100).optional(),
      profileOpacity: z.number().min(0).max(100).optional(),
      profileBlur: z.number().min(0).max(100).optional(),
      backgroundEffect: z.enum(['none', 'particles', 'snow', 'rain', 'stars']).optional(),
      usernameEffect: z.enum(['none', 'glow', 'rainbow', 'typing', 'wave']).optional(),
      enterText: z.string().max(50).optional(),

      // Color Settings
      accentColor: z.string().optional(),
      textColor: z.string().optional(),
      secondaryTextColor: z.string().optional(),
      backgroundColor: z.string().optional(),
      gradientEnabled: z.boolean().optional(),
      gradientColors: z.array(z.string()).max(5).optional(),
      backgroundType: z.enum(['solid', 'gradient', 'image']).optional(),
      backgroundGradient: z.string().optional(),

      // Border Settings
      borderEnabled: z.boolean().optional(),
      borderColor: z.string().optional(),
      borderRadius: z.number().min(0).max(100).optional(),

      // About Me Settings
      aboutMeEnabled: z.boolean().optional(),
      aboutMeText: z.string().max(1024).optional(),
      aboutMeAdvanced: z.boolean().optional(),

      // Time Settings
      showJoinDate: z.boolean().optional(),
      timeFormat: z.enum(['12h', '24h']).optional(),
      displayMode: z.enum(['absolute', 'relative']).optional(),
      timeSchema: z.string().max(50).optional(),

      // Other Settings
      volumeControl: z.boolean().optional(),
      titleAnimation: z.enum(['none', 'typing', 'fade', 'slide']).optional(),
      forceEnterScreen: z.boolean().optional(),
      showViews: z.boolean().optional(),
      viewsAnimation: z.boolean().optional(),
      viewsAnimationDuration: z.number().min(100).max(5000).optional(),
      parallaxEnabled: z.boolean().optional(),
      parallaxInverted: z.boolean().optional(),
      parallaxIntensity: z.number().min(0).max(100).optional(),
      allowFeedback: z.boolean().optional(),
      allowComments: z.boolean().optional(),
      commentsPublic: z.boolean().optional(),

      // Theme/Layout
      theme: z.enum(['default', 'modern', 'simplistic', 'portfolio', 'blue', 'purple', 'green', 'red', 'orange', 'cyan', 'pink', 'teal']).optional(),
    })
    .optional(),

  // Media Managers
  backgrounds: z.array(z.object({
    url: z.string().url(),
    position: z.string().optional()
  })).max(3).optional(),
  backgroundShuffle: z.boolean().optional(),
  backgroundLoop: z.boolean().optional(),
  backgroundDuration: z.number().min(1).max(60).optional(),

  audios: z.array(z.object({
    url: z.string().url(),
    name: z.string()
  })).max(5).optional(),
  audioShuffle: z.boolean().optional(),
  audioPlayer: z.boolean().optional(),
  audioVolume: z.boolean().optional(),
  audioSticky: z.boolean().optional(),

  customCursor: z.string().url().optional().or(z.literal('')),
  customPointerCursor: z.string().url().optional().or(z.literal('')),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  verificationBadge: verificationBadgeEnum
    .optional()
    .default('none')
    .transform((v) => v ?? 'none')
    .refine((v) => v !== null, {
      message: 'verificationBadge cannot be null',
    }),
});

const updateProfileSchema = createProfileSchema
  .partial()
  .extend({
    cardImageUrl: z.string().url().optional().or(z.literal('')),
    profileBackgroundUrl: z.string().url().optional().or(z.literal('')),
  });

// Premium field validation for media limits
const validateMediaLimits = (profile: any, data: any) => {
  const errors: string[] = [];
  
  // Background limits: 1 for free, 3 for premium
  if (data.backgrounds) {
    const maxBackgrounds = profile.isPremium ? 3 : 1;
    if (data.backgrounds.length > maxBackgrounds) {
      errors.push(`You can only have up to ${maxBackgrounds} background${maxBackgrounds > 1 ? 's' : ''}. ${!profile.isPremium ? 'Upgrade to premium for more.' : ''}`);
    }
  }
  
  // Audio limits: 3 for free, 5 for premium
  if (data.audios) {
    const maxAudios = profile.isPremium ? 5 : 3;
    if (data.audios.length > maxAudios) {
      errors.push(`You can only have up to ${maxAudios} audio tracks. ${!profile.isPremium ? 'Upgrade to premium for more.' : ''}`);
    }
  }
  
  // Custom cursors are premium only
  if (!profile.isPremium && (data.customCursor || data.customPointerCursor)) {
    errors.push('Custom cursors are a premium feature.');
  }
  
  // Force enter screen is premium only
  if (!profile.isPremium && data.customization?.forceEnterScreen) {
    errors.push('Force enter screen is a premium feature.');
  }
  
  // Enter text is premium only
  if (!profile.isPremium && data.customization?.enterText) {
    errors.push('Custom enter text is a premium feature.');
  }
  
  return errors;
};

// Remove null/undefined values from object
function stripNulls<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};
  for (const key in obj) {
    const val = obj[key];
    if (val !== null && val !== undefined) {
      cleaned[key] = val;
    }
  }
  return cleaned;
}

// Ensure legacy documents have valid verificationBadge
function ensureVerificationBadge(profile: any) {
  const allowed = ['none', 'verified', 'moderator'] as const;
  if (!allowed.includes(profile.verificationBadge)) {
    profile.verificationBadge = 'none';
  }
}

// CREATE PROFILE
router.post('/', authMiddleware, async (req: any, res) => {
  try {
    const data = createProfileSchema.parse(req.body);

    const [existingProfile, existingUsername, existingSlug] = await Promise.all([
      Profile.findOne({ userId: req.user._id }),
      Profile.findOne({ username: data.username }),
      Profile.findOne({ slug: data.slug }),
    ]);

    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists' });
    }
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    if (existingSlug) {
      return res.status(400).json({ error: 'Slug already taken' });
    }

    const contentValidation = validateProfileContent({
      displayName: data.displayName,
      headline: data.headline,
      bio: data.bio,
      description: data.description,
    });
    if (!contentValidation.valid) {
      return res.status(400).json({
        error: 'Content validation failed',
        details: contentValidation.errors,
      });
    }

    const imageUrls = [
      data.avatarUrl,
      data.bannerUrl,
      ...(data.profileImages || []),
    ].filter(Boolean) as string[];
    const imageValidation = validateImageUrls(imageUrls);
    if (!imageValidation.valid) {
      return res.status(400).json({
        error: 'Image validation failed',
        details: imageValidation.errors,
      });
    }

    if (data.profileImages && data.profileImages.length > 5) {
      return res
        .status(400)
        .json({ error: 'Regular users can only have up to 5 images' });
    }

    const profile = new Profile({
      ...data,
      userId: req.user._id,
      displayName: data.displayName || data.username,
      verificationBadge: data.verificationBadge ?? 'none',
      approved: true,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Profile creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ALL APPROVED PROFILES
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

// CHECK USERNAME AVAILABILITY
router.get('/check-username/:username', async (req, res) => {
  try {
    const existing = await Profile.findOne({
      username: req.params.username.toLowerCase(),
    });
    res.json({ available: !existing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// CHECK SLUG AVAILABILITY
router.get('/check-slug/:slug', async (req, res) => {
  try {
    const existing = await Profile.findOne({
      slug: req.params.slug.toLowerCase(),
    });
    res.json({ available: !existing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET PROFILE BY SLUG
router.get('/slug/:slug', async (req, res) => {
  try {
    const profile = await Profile.findOne({ slug: req.params.slug }).populate(
      'userId',
      'email'
    );

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const projects = await Project.find({ profileId: profile._id });

    res.json({ ...profile.toObject(), projects });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET CURRENT USER PROFILE
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

// UPDATE PROFILE
router.patch('/:id', authMiddleware, async (req: any, res) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    if (profile.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (data.username && data.username !== profile.username) {
      const existingUsername = await Profile.findOne({
        username: data.username,
        _id: { $ne: profile._id },
      });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    if (data.slug && data.slug !== profile.slug) {
      const existingSlug = await Profile.findOne({
        slug: data.slug,
        _id: { $ne: profile._id },
      });
      if (existingSlug) {
        return res.status(400).json({ error: 'Slug already taken' });
      }
    }

    const contentValidation = validateProfileContent({
      displayName: data.displayName,
      headline: data.headline,
      bio: data.bio,
      description: data.description,
    });
    if (!contentValidation.valid) {
      return res.status(400).json({
        error: 'Content validation failed',
        details: contentValidation.errors,
      });
    }

    const imageUrls = [
      data.avatarUrl,
      data.bannerUrl,
      data.cardImageUrl,
      data.profileBackgroundUrl,
      ...(data.profileImages || []),
    ].filter(Boolean) as string[];
    const imageValidation = validateImageUrls(imageUrls);
    if (!imageValidation.valid) {
      return res.status(400).json({
        error: 'Image validation failed',
        details: imageValidation.errors,
      });
    }

    if (data.profileImages) {
      const maxImages = profile.isPremium ? 10 : 5;
      if (data.profileImages.length > maxImages) {
        return res.status(400).json({
          error: `You can only have up to ${maxImages} images. ${
            profile.isPremium ? '' : 'Upgrade to premium for 10 images.'
          }`,
        });
      }
    }

    // Validate media limits based on premium status
    const mediaErrors = validateMediaLimits(profile, data);
    if (mediaErrors.length > 0) {
      return res.status(400).json({
        error: 'Media validation failed',
        details: mediaErrors,
      });
    }

    // Remove premium-only fields for non-premium users
    if (!profile.isPremium) {
      delete data.cardImageUrl;
      delete data.profileBackgroundUrl;
      delete data.customCursor;
      delete data.customPointerCursor;
      if (data.customization) {
        delete data.customization.forceEnterScreen;
        delete data.customization.enterText;
      }
    }

    // Sanitize verificationBadge - remove if null or invalid
    if ('verificationBadge' in data) {
      const allowedBadges = ['none', 'verified', 'moderator'] as const;
      if (
        data.verificationBadge == null ||
        typeof data.verificationBadge !== 'string' ||
        !allowedBadges.includes(data.verificationBadge as any)
      ) {
        delete data.verificationBadge;
      }
    }

    // Remove null/undefined values before assignment
    const safeData = stripNulls(data);

    // Fix legacy documents that may have null verificationBadge
    ensureVerificationBadge(profile);

    Object.assign(profile, safeData);
    await profile.save();

    res.json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;