import mongoose from 'mongoose';
const shortlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
shortlistSchema.index({ userId: 1, profileId: 1 }, { unique: true });
export default mongoose.model('Shortlist', shortlistSchema);
