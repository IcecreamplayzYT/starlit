// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/database.js';
// // Routes
// import authRoutes from './routes/auth.js';
// import profileRoutes from './routes/profiles.js';
// import projectRoutes from './routes/projects.js';
// import analyticsRoutes from './routes/analytics.js';
// import adminRoutes from './routes/admin.js';
// import roleRoutes from './routes/roles.js';
// import shortlistRoutes from './routes/shortlists.js';
// import likeRoutes from './routes/likes.js';
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true
// }));
// app.use(express.json());
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profiles', profileRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/roles', roleRoutes);
// app.use('/api/shortlists', shortlistRoutes);
// app.use('/api/likes', likeRoutes);
// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ message: 'STARLIT API is running', timestamp: new Date().toISOString() });
// });
// // Error handling middleware
// app.use((err: any, req: any, res: any, next: any) => {
//   console.error('Error:', err);
//   res.status(500).json({ error: 'Internal server error' });
// });
// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });
// // Connect to database and start server
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`🚀 STARLIT API server running on http://localhost:${PORT}`);
//       console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };
// startServer();
// Original Code
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
// Routes
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profiles.js';
import projectRoutes from './routes/projects.js';
import analyticsRoutes from './routes/analytics.js';
import adminRoutes from './routes/admin.js';
import roleRoutes from './routes/roles.js';
import shortlistRoutes from './routes/shortlists.js';
import likeRoutes from './routes/likes.js';
import chatRoutes from './routes/chat.js';
import discoverRoutes from './routes/discover.js';
import viewsRoutes from './routes/views.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/shortlists', shortlistRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/discover', discoverRoutes);
app.use('/api/views', viewsRoutes);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'STARLIT API is running', timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 STARLIT API server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
