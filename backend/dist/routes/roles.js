import express from 'express';
import UserRole from '../models/UserRole.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();
// Get user's roles
router.get('/', authMiddleware, async (req, res) => {
    try {
        const roles = await UserRole.find({ userId: req.user._id });
        res.json(roles.map(r => r.role));
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;
