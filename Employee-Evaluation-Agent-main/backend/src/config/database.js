const mongoose = require('mongoose');
const logger = require('./logger');

let mongoServer;

// Initialize MongoDB Memory Server for development
const initializeMemoryDB = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      logger.info('Starting MongoDB Memory Server...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      
      // Start with timeout
      mongoServer = await Promise.race([
        MongoMemoryServer.create({
          instance: {
            dbName: 'smart-examination-system',
          },
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('MongoDB Memory Server timeout')), 15000)
        )
      ]);
      
      const uri = mongoServer.getUri();
      logger.info(`MongoDB Memory Server started at: ${uri}`);
      return uri;
    } catch (error) {
      logger.warn(`Failed to start MongoDB Memory Server: ${error.message}`);
      logger.info('Using fallback URI for development');
      return 'mongodb://localhost:27017/smart-examination-system';
    }
  }
  return process.env.MONGODB_URI;
};

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    const uri = await initializeMemoryDB();
    
    // Try to connect with a timeout
    const conn = await Promise.race([
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 second timeout
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 10000)
      )
    ]);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.warn(`MongoDB connection failed: ${error.message}`);
    logger.info('Server will start without database connection');
    // Don't exit, continue without database for now
    return null;
  }
};

/**
 * Close MongoDB connection
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
      logger.info('MongoDB Memory Server stopped');
    }
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error(`Error closing MongoDB connection: ${error.message}`);
  }
};

module.exports = {
  connectDB,
  closeDB,
};
