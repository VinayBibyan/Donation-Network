
import mongoose from 'mongoose';

const needSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Need', needSchema);
