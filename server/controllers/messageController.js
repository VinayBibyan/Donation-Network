
import Message from '../models/Message.js';
import User from '../models/User.js';

// Get all conversations
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all messages where the user is either sender or recipient
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { recipient: userId }
      ]
    }).populate('sender recipient', 'name image');
    
    // Extract unique conversation partners
    const conversations = [];
    const conversationPartners = new Set();
    
    messages.forEach(message => {
      const partnerId = message.sender._id.toString() === userId 
        ? message.recipient._id.toString() 
        : message.sender._id.toString();
        
      if (!conversationPartners.has(partnerId)) {
        conversationPartners.add(partnerId);
        const partner = message.sender._id.toString() === userId 
          ? message.recipient 
          : message.sender;
          
        // Find last message in conversation
        const lastMessage = messages
          .filter(m => 
            (m.sender._id.toString() === userId && m.recipient._id.toString() === partnerId) ||
            (m.sender._id.toString() === partnerId && m.recipient._id.toString() === userId)
          )
          .sort((a, b) => b.createdAt - a.createdAt)[0];
          
        // Count unread messages
        const unreadCount = messages.filter(m => 
          m.sender._id.toString() === partnerId && 
          m.recipient._id.toString() === userId && 
          !m.read
        ).length;
        
        conversations.push({
          user: partner,
          lastMessage: {
            content: lastMessage.content,
            createdAt: lastMessage.createdAt,
            sender: lastMessage.sender._id.toString() === userId ? 'me' : 'them'
          },
          unreadCount
        });
      }
    });
    
    res.json(conversations);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const partnerId = req.params.userId;
    
    // Validate partner exists
    const partnerExists = await User.exists({ _id: partnerId });
    if (!partnerExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all messages between the users
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: partnerId },
        { sender: partnerId, recipient: userId }
      ]
    })
    .populate('sender recipient', 'name image')
    .sort({ createdAt: 1 });
    
    // Mark messages as read
    await Message.updateMany(
      { sender: partnerId, recipient: userId, read: false },
      { $set: { read: true } }
    );
    
    res.json(messages);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const recipientId = req.params.userId;
    
    // Validate recipient exists
    const recipientExists = await User.exists({ _id: recipientId });
    if (!recipientExists) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content
    });
    
    const savedMessage = await message.save();
    
    // Populate sender and recipient info
    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('sender recipient', 'name image');
      
    res.status(201).json(populatedMessage);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
