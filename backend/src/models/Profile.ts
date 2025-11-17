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
  name: {
    type: String,
    required: true
  },
  headline: String,
  bio: {
    type: String,
    maxlength: 500
  },
  avatarUrl: String,
  heroImage: String,
  location: String,
  hourlyRate: Number,
  availabilityStatus: {
    type: String,
    enum: ['open', 'booked', 'unavailable'],
    default: 'open'
  },
  tags: [String],
  tools: [String],
  role: {
    type: String,
    default: 'designer'
  },
  website: String,
  twitter: String,
  dribbble: String,
  behance: String,
  github: String,
  linkedin: String,
  approved: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  featuredUntil: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

profileSchema.pre('save', function() {
  this.updatedAt = new Date();
});

export default mongoose.model('Profile', profileSchema);