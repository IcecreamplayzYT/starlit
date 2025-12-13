import mongoose from 'mongoose';
const weeklyStatsSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    weekStart: {
        type: Date,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
weeklyStatsSchema.index({ profileId: 1, weekStart: 1 }, { unique: true });
weeklyStatsSchema.index({ weekStart: -1, views: -1 });
weeklyStatsSchema.index({ weekStart: -1, likes: -1 });
export default mongoose.model('WeeklyStats', weeklyStatsSchema);
