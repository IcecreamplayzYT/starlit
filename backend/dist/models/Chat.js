import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
    participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
chatSchema.index({ participants: 1 });
export default mongoose.model('Chat', chatSchema);
