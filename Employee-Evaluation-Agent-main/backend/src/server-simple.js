const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

console.log('🚀 Starting Smart Examination System Backend...');

// Import routes (test if these are causing issues)
try {
  console.log('📁 Loading routes...');
  const authRoutes = require('./routes/auth.routes');
  const adminRoutes = require('./routes/admin.routes');
  const examRoutes = require('./routes/exam.routes');
  const evaluationRoutes = require('./routes/evaluation.routes');
  console.log('✅ Routes loaded successfully');
  
  // Import middleware
  console.log('🔧 Loading middleware...');
  const { errorHandler } = require('./middleware/error.middleware');
  const { authMiddleware } = require('./middleware/auth.middleware');
  console.log('✅ Middleware loaded successfully');

  // Initialize Express app
  const app = express();

  // Set security HTTP headers
  app.use(helmet());

  // Parse JSON request body
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Enable CORS
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
  }));

  // Request logging
  app.use(morgan('dev'));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', authMiddleware, adminRoutes);
  app.use('/api/exam', examRoutes);
  app.use('/api/evaluation', authMiddleware, evaluationRoutes);

  // Health check route
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date(),
      message: 'Smart Examination System Backend is running!',
      database: 'Not connected (simplified mode)'
    });
  });

  // Error handler middleware
  app.use(errorHandler);

  // Start server without database
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🎉 Server running on port ${PORT}`);
    console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
    console.log(`⚠️  Running in simplified mode (no database)`);
  });

} catch (error) {
  console.error('❌ Server startup failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}