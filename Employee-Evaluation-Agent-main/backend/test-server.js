const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('Starting minimal test server...');

// Initialize Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Test routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date(),
    message: 'Test server is working!' 
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Smart Examination System!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});

console.log('Test server setup complete');