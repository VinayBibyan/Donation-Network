
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './server/routes/userRoutes.js';
import itemRoutes from './server/routes/itemRoutes.js';
import needRoutes from './server/routes/needRoutes.js';
import messageRoutes from './server/routes/messageRoutes.js';

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
// API routes - individually wrapped in try/catch to debug path-to-regexp errors
try {
  console.log('Registering user routes');
  app.use('/api/users', userRoutes);
} catch (error) {
  console.error('User route registration error:', error);
}

try {
  console.log('Registering item routes');
  app.use('/api/items', itemRoutes);
} catch (error) {
  console.error('Item route registration error:', error);
}

try {
  console.log('Registering need routes');
  app.use('/api/needs', needRoutes);
} catch (error) {
  console.error('Need route registration error:', error);
}

try {
  console.log('Registering message routes');
  app.use('/api/messages', messageRoutes);
} catch (error) {
  console.error('Message route registration error:', error);
}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err.stack);
  res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
