import express from 'express';
import Shortlist from '../models/Shortlist.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();
// Add to shortlist
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { profileId } = req.body;
        const shortlist = new Shortlist({
            userId: req.user._id,
            profileId
        });
        await shortlist.save();
        res.status(201).json(shortlist);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Already in shortlist' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});
// Get user's shortlists
router.get('/', authMiddleware, async (req, res) => {
    try {
        const shortlists = await Shortlist.find({ userId: req.user._id })
            .populate('profileId');
        res.json(shortlists);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Remove from shortlist
router.delete('/:profileId', authMiddleware, async (req, res) => {
    try {
        const shortlist = await Shortlist.findOneAndDelete({
            userId: req.user._id,
            profileId: req.params.profileId
        });
        if (!shortlist) {
            return res.status(404).json({ error: 'Shortlist entry not found' });
        }
        res.json({ message: 'Removed from shortlist' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;
