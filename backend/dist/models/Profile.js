// // import mongoose from 'mongoose';
// // const profileSchema = new mongoose.Schema({
// //   userId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true,
// //     unique: true
// //   },
// //   slug: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true
// //   },
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   headline: String,
// //   bio: {
// //     type: String,
// //     maxlength: 500
// //   },
// //   avatarUrl: String,
// //   heroImage: String,
// //   location: String,
// //   hourlyRate: Number,
// //   availabilityStatus: {
// //     type: String,
// //     enum: ['open', 'booked', 'unavailable'],
// //     default: 'open'
// //   },
// //   tags: [String],
// //   tools: [String],
// //   role: {
// //     type: String,
// //     default: 'designer'
// //   },
// //   website: String,
// //   twitter: String,
// //   dribbble: String,
// //   behance: String,
// //   github: String,
// //   linkedin: String,
// //   approved: {
// //     type: Boolean,
// //     default: false
// //   },
// //   featured: {
// //     type: Boolean,
// //     default: false
// //   },
// //   featuredUntil: Date,
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   updatedAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });
// // profileSchema.pre('save', function() {
// //   this.updatedAt = new Date();
// // });
// // export default mongoose.model('Profile', profileSchema);
// // V2
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
//     }
//   },
//   website: String,
//   twitter: String,
//   dribbble: String,
//   behance: String,
//   github: String,
//   linkedin: String,
//   approved: {
//     type: Boolean,
//     default: true  // Auto-approve profiles
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
// export default mongoose.model('Profile', profileSchema);
// V3
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
    roles: [String], // Multiple roles now
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
                const maxImages = this.isPremium ? 10 : 5;
                return images.length <= maxImages;
            },
            message: 'Regular users can have up to 5 images, premium users up to 10'
        }
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    // Premium features
    cardImageUrl: String, // Custom discovery card image
    profileBackgroundUrl: String, // Custom profile background
    customization: {
        primaryColor: {
            type: String,
            default: '#3B82F6'
        },
        secondaryColor: {
            type: String,
            default: '#8B5CF6'
        },
        positioning: {
            type: String,
            enum: ['left', 'center', 'right'],
            default: 'center'
        },
        theme: {
            type: String,
            enum: ['blue', 'purple', 'green', 'red', 'orange'],
            default: 'blue'
        },
        backgroundType: {
            type: String,
            enum: ['solid', 'gradient', 'image'],
            default: 'solid'
        },
        backgroundColor: String,
        backgroundGradient: String
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
    isStaff: {
        type: Boolean,
        default: false
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
