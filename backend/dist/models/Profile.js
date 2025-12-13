// import mongoose from 'mongoose';
// const profileSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   displayName: {
//     type: String,
//     required: true
//   },
//   headline: String,
//   bio: {
//     type: String,
//     maxlength: 500
//   },
//   description: {
//     type: String,
//     maxlength: 1000
//   },
//   avatarUrl: String,
//   heroImage: String,
//   bannerUrl: String,
//   location: String,
//   hourlyRate: Number,
//   availabilityStatus: {
//     type: String,
//     enum: ['open', 'booked', 'unavailable'],
//     default: 'open'
//   },
//   tags: [String],
//   tools: [String],
//   roles: [String], // Multiple roles now
//   role: {
//     type: String,
//     default: 'designer'
//   },
//   contactMethods: [{
//     type: {
//       type: String,
//       enum: ['email', 'phone', 'discord', 'telegram', 'other']
//     },
//     value: String,
//     label: String
//   }],
//   profileImages: {
//     type: [String],
//     validate: {
//       validator: function(images: string[]) {
//         const maxImages = (this as any).isPremium ? 10 : 5;
//         return images.length <= maxImages;
//       },
//       message: 'Regular users can have up to 5 images, premium users up to 10'
//     }
//   },
//   isPremium: {
//     type: Boolean,
//     default: false
//   },
//   // Premium features
//   cardImageUrl: String, // Custom discovery card image
//   profileBackgroundUrl: String, // Custom profile background
//   customization: {
//     primaryColor: {
//       type: String,
//       default: '#3B82F6'
//     },
//     secondaryColor: {
//       type: String,
//       default: '#8B5CF6'
//     },
//     positioning: {
//       type: String,
//       enum: ['left', 'center', 'right'],
//       default: 'center'
//     },
//     theme: {
//       type: String,
//       enum: ['blue', 'purple', 'green', 'red', 'orange'],
//       default: 'blue'
//     },
//     backgroundType: {
//       type: String,
//       enum: ['solid', 'gradient', 'image'],
//       default: 'solid'
//     },
//     backgroundColor: String,
//     backgroundGradient: String
//   },
//   website: String,
//   twitter: String,
//   dribbble: String,
//   behance: String,
//   github: String,
//   linkedin: String,
//   approved: {
//     type: Boolean,
//     default: true
//   },
//   featured: {
//     type: Boolean,
//     default: false
//   },
//   featuredUntil: Date,
//   likes: {
//     type: Number,
//     default: 0
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   weeklyViews: {
//     type: Number,
//     default: 0
//   },
//   weeklyLikes: {
//     type: Number,
//     default: 0
//   },
//   isStaff: {
//     type: Boolean,
//     default: false
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });
// profileSchema.pre('save', function() {
//   this.updatedAt = new Date();
// });
// // Text index for search
// profileSchema.index({ 
//   displayName: 'text', 
//   username: 'text', 
//   headline: 'text',
//   bio: 'text',
//   tools: 'text'
// });
// export default mongoose.model('Profile', profileSchema);
import mongoose from 'mongoose';
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true
    },
    headline: String,
    bio: {
        type: String,
        maxlength: 500
    },
    description: {
        type: String,
        maxlength: 1000
    },
    avatarUrl: String,
    heroImage: String,
    bannerUrl: String,
    location: String,
    hourlyRate: Number,
    availabilityStatus: {
        type: String,
        enum: ['open', 'booked', 'unavailable'],
        default: 'open'
    },
    tags: [String],
    tools: [String],
    roles: [String],
    role: {
        type: String,
        default: 'designer'
    },
    contactMethods: [{
            type: {
                type: String,
                enum: ['email', 'phone', 'discord', 'telegram', 'other']
            },
            value: String,
            label: String
        }],
    profileImages: {
        type: [String],
        validate: {
            validator: function (images) {
                const maxImages = this.isPremium ? 20 : 5;
                return images.length <= maxImages;
            },
            message: 'Regular users can have up to 5 images, premium users up to 20'
        }
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    premiumExpiry: Date,
    // Premium features
    cardImageUrl: String,
    profileBackgroundUrl: String,
    profileBadges: [{
            icon: String,
            text: String,
            color: String
        }],
    featuredProjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
    // Advanced customization
    customization: {
        // Colors
        primaryColor: {
            type: String,
            default: '#3B82F6'
        },
        secondaryColor: {
            type: String,
            default: '#8B5CF6'
        },
        accentColor: {
            type: String,
            default: '#EC4899'
        },
        textColor: {
            type: String,
            default: '#FFFFFF'
        },
        backgroundColor: {
            type: String,
            default: '#0A0A0A'
        },
        // Layout
        positioning: {
            type: String,
            enum: ['left', 'center', 'right'],
            default: 'center'
        },
        theme: {
            type: String,
            enum: ['blue', 'purple', 'green', 'red', 'orange', 'cyan', 'pink', 'teal'],
            default: 'blue'
        },
        // Background
        backgroundType: {
            type: String,
            enum: ['solid', 'gradient', 'image'],
            default: 'solid'
        },
        backgroundGradient: String,
        // Typography
        fontStyle: {
            type: String,
            enum: ['sans-serif', 'serif', 'monospace'],
            default: 'sans-serif'
        },
        fontSize: {
            type: String,
            enum: ['small', 'medium', 'large'],
            default: 'medium'
        },
        // Cards
        cardStyle: {
            type: String,
            enum: ['modern', 'minimal', 'glassmorphism', 'neumorphism'],
            default: 'modern'
        },
        borderRadius: {
            type: String,
            enum: ['none', 'small', 'medium', 'large', 'full'],
            default: 'medium'
        },
        shadowIntensity: {
            type: String,
            enum: ['none', 'light', 'medium', 'heavy'],
            default: 'medium'
        },
        // Animations
        animationSpeed: {
            type: String,
            enum: ['none', 'slow', 'normal', 'fast'],
            default: 'normal'
        },
        enableParticles: {
            type: Boolean,
            default: false
        },
        // Display options
        showSocialIcons: {
            type: Boolean,
            default: true
        },
        compactMode: {
            type: Boolean,
            default: false
        },
        hideStats: {
            type: Boolean,
            default: false
        },
        // Custom CSS (Premium only)
        customCSS: String
    },
    website: String,
    twitter: String,
    dribbble: String,
    behance: String,
    github: String,
    linkedin: String,
    approved: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    featuredUntil: Date,
    // Stats
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    weeklyViews: {
        type: Number,
        default: 0
    },
    weeklyLikes: {
        type: Number,
        default: 0
    },
    // Verification
    isStaff: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationBadge: {
        type: String,
        enum: ['staff', 'creator', 'pro', 'top_contributor'],
        default: null
    },
    // Premium features tracking
    premiumFeatures: {
        unlimitedImages: {
            type: Boolean,
            default: false
        },
        customDomain: {
            type: Boolean,
            default: false
        },
        prioritySupport: {
            type: Boolean,
            default: false
        },
        analyticsAccess: {
            type: Boolean,
            default: false
        },
        customBranding: {
            type: Boolean,
            default: false
        },
        adFree: {
            type: Boolean,
            default: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
profileSchema.pre('save', function () {
    this.updatedAt = new Date();
    // Auto-enable premium features if user is premium
    if (this.isPremium) {
        this.premiumFeatures = {
            unlimitedImages: true,
            customDomain: true,
            prioritySupport: true,
            analyticsAccess: true,
            customBranding: true,
            adFree: true
        };
    }
});
// Text index for search
profileSchema.index({
    displayName: 'text',
    username: 'text',
    headline: 'text',
    bio: 'text',
    tools: 'text'
});
export default mongoose.model('Profile', profileSchema);
