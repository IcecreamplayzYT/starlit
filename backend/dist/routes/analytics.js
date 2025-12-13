import express from 'express';
import { z } from 'zod';
import AnalyticsEvent from '../models/AnalyticsEvent.js';
import Profile from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();
const createEventSchema = z.object({
    profileId: z.string(),
    eventType: z.enum(['profile_view', 'project_click', 'contact_attempt', 'shortlist']),
    metadata: z.any().optional()
});
// Create analytics event (public, no auth required)
router.post('/', async (req, res) => {
    try {
        const data = createEventSchema.parse(req.body);
        const event = new AnalyticsEvent(data);
        await event.save();
        res.status(201).json(event);
    }
    catch (error) {
        // Silently fail for analytics
        res.status(200).json({ message: 'ok' });
    }
});
// Get profile analytics (owner or admin only)
router.get('/profile/:profileId', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        // Check ownership (simplified - should also check admin role)
        if (profile.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const events = await AnalyticsEvent.find({ profileId: req.params.profileId })
            .sort({ createdAt: -1 });
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;
