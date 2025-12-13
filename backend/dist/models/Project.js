import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    images: [String],
    tools: [String],
    year: Number,
    externalLink: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Project', projectSchema);
