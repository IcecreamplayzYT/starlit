import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  eventType: {
    type: String,
    enum: ['profile_view', 'project_click', 'contact_attempt', 'shortlist'],
    required: true
  },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('AnalyticsEvent', analyticsEventSchema);