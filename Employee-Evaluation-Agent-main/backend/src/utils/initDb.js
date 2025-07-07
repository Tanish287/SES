const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const logger = require('../config/logger');

/**
 * Initialize database with default admin user
 */
const initializeDatabase = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@smartexam.com' });
    
    if (!existingAdmin) {
      // Create default admin user
      const adminUser = new User({
        name: 'System Administrator',
        email: 'admin@smartexam.com',
        password: 'admin123', // This will be hashed by the pre-save middleware
        role: 'admin',
      });
      
      await adminUser.save();
      logger.info('Default admin user created successfully');
      logger.info('Admin Login Credentials:');
      logger.info('Email: admin@smartexam.com');
      logger.info('Password: admin123');
    } else {
      logger.info('Admin user already exists');
    }
  } catch (error) {
    logger.error('Error initializing database:', error.message);
  }
};

module.exports = {
  initializeDatabase,
};