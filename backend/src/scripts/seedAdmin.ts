import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import UserRole from '../models/UserRole.js';
import connectDB from '../config/database.js';

const seedAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const passwordHash = await bcrypt.hash('admin', 12);
    const admin = new User({
      email: 'admin@admin.com',
      passwordHash
    });
    await admin.save();

    // Create admin role
    await new UserRole({
      userId: admin._id,
      role: 'admin'
    }).save();

    console.log('Admin user created successfully');
    console.log('Email: admin@admin.com');
    console.log('Password: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();