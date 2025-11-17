import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'designer', 'hirer'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userRoleSchema.index({ userId: 1, role: 1 }, { unique: true });

export default mongoose.model('UserRole', userRoleSchema);