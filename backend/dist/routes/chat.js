import express from 'express';
import ChatRequest from '../models/ChatRequest.js';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import Profile from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';
import { filterBadWords, containsBadWords } from '../utils/moderation.js';
const router = express.Router();
// Send chat request
router.post('/request', authMiddleware, async (req, res) => {
    try {
        const { receiverId } = req.body;
        if (receiverId === req.user._id.toString()) {
            return res.status(400).json({ error: 'Cannot send request to yourself' });
        }
        // Check existing request
        const existing = await ChatRequest.findOne({
            $or: [
                { senderId: req.user._id, receiverId },
                { senderId: receiverId, receiverId: req.user._id }
            ]
        });
        if (existing) {
            if (existing.status === 'accepted') {
                return res.status(400).json({ error: 'Chat already exists' });
            }
            if (existing.status === 'pending') {
                return res.status(400).json({ error: 'Request already pending' });
            }
            if (existing.status === 'denied') {
                return res.status(400).json({ error: 'Request was denied' });
            }
        }
        const request = new ChatRequest({
            senderId: req.user._id,
            receiverId
        });
        await request.save();
        res.status(201).json(request);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get pending requests
router.get('/requests', authMiddleware, async (req, res) => {
    try {
        const requests = await ChatRequest.find({
            receiverId: req.user._id,
            status: 'pending'
        }).populate({
            path: 'senderId',
            select: 'email'
        });
        // Get sender profiles
        const requestsWithProfiles = await Promise.all(requests.map(async (request) => {
            const profile = await Profile.findOne({ userId: request.senderId });
            return {
                ...request.toObject(),
                senderProfile: profile
            };
        }));
        res.json(requestsWithProfiles);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Accept chat request
router.post('/request/:id/accept', authMiddleware, async (req, res) => {
    try {
        const request = await ChatRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        if (request.receiverId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        request.status = 'accepted';
        request.updatedAt = new Date();
        await request.save();
        // Create chat
        const chat = new Chat({
            participants: [request.senderId, request.receiverId]
        });
        await chat.save();
        res.json({ request, chat });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Deny chat request
router.post('/request/:id/deny', authMiddleware, async (req, res) => {
    try {
        const request = await ChatRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        if (request.receiverId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        // Delete the request entirely
        await ChatRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Request denied and deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get user's chats
router.get('/', authMiddleware, async (req, res) => {
    try {
        const chats = await Chat.find({
            participants: req.user._id
        })
            .populate('lastMessage')
            .sort({ lastMessageAt: -1 });
        // Get other participant's profile for each chat
        const chatsWithProfiles = await Promise.all(chats.map(async (chat) => {
            const otherUserId = chat.participants.find((p) => p.toString() !== req.user._id.toString());
            const profile = await Profile.findOne({ userId: otherUserId });
            return {
                ...chat.toObject(),
                otherProfile: profile
            };
        }));
        res.json(chatsWithProfiles);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get chat messages
router.get('/:chatId/messages', authMiddleware, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        // Verify user is participant
        const isParticipant = chat.participants.some((p) => p.toString() === req.user._id.toString());
        if (!isParticipant) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const messages = await Message.find({ chatId: req.params.chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        // Mark as read
        await Message.updateMany({
            chatId: req.params.chatId,
            senderId: { $ne: req.user._id },
            read: false
        }, { read: true });
        res.json(messages.reverse());
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Send message
router.post('/:chatId/messages', authMiddleware, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        // Verify user is participant
        const isParticipant = chat.participants.some((p) => p.toString() === req.user._id.toString());
        if (!isParticipant) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        let { content } = req.body;
        if (!content || !content.trim()) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }
        // Filter bad words
        const badWordCheck = containsBadWords(content);
        const filteredContent = filterBadWords(content);
        const message = new Message({
            chatId: req.params.chatId,
            senderId: req.user._id,
            content: filteredContent,
            filtered: badWordCheck.found
        });
        await message.save();
        // Update chat
        chat.lastMessage = message._id;
        chat.lastMessageAt = new Date();
        await chat.save();
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get unread count
router.get('/unread', authMiddleware, async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.user._id });
        const chatIds = chats.map(c => c._id);
        const unreadCount = await Message.countDocuments({
            chatId: { $in: chatIds },
            senderId: { $ne: req.user._id },
            read: false
        });
        res.json({ unreadCount });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;
