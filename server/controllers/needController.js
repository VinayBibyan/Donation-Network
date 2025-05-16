
import Need from '../models/Need.js';

// Get all needs
export const getNeeds = async (req, res) => {
  try {
    const { category, urgency, search } = req.query;
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (urgency && urgency !== 'any') {
      query.urgency = urgency;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const needs = await Need.find(query)
      .populate('requester', 'name image location')
      .sort({ createdAt: -1 });
      
    res.json(needs);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get need by ID
export const getNeedById = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id)
      .populate('requester', 'name image location');
      
    if (!need) {
      return res.status(404).json({ message: 'Need not found' });
    }
    
    res.json(need);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new need
export const createNeed = async (req, res) => {
  try {
    const { title, description, category, urgency, location } = req.body;
    
    // Handle image upload
    let imagePath = '';
    if (req.file) {
      imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const need = new Need({
      title,
      description,
      category,
      urgency,
      image: imagePath || 'https://via.placeholder.com/300',
      location,
      requester: req.user.id
    });
    
    const createdNeed = await need.save();
    
    res.status(201).json(createdNeed);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update need
export const updateNeed = async (req, res) => {
  try {
    const { title, description, category, urgency, location, isActive } = req.body;
    
    const need = await Need.findById(req.params.id);
    
    if (!need) {
      return res.status(404).json({ message: 'Need not found' });
    }
    
    // Check if user is the requester
    if (need.requester.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    need.title = title || need.title;
    need.description = description || need.description;
    need.category = category || need.category;
    need.urgency = urgency || need.urgency;
    need.location = location || need.location;
    need.isActive = isActive !== undefined ? isActive : need.isActive;
    
    // Handle image upload
    if (req.file) {
      need.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const updatedNeed = await need.save();
    
    res.json(updatedNeed);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update need status
export const updateNeedStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const need = await Need.findById(req.params.id);
    
    if (!need) {
      return res.status(404).json({ message: 'Need not found' });
    }
    
    // Check if user is the requester
    if (need.requester.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    need.isActive = isActive;
    
    const updatedNeed = await need.save();
    
    res.json(updatedNeed);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete need
export const deleteNeed = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id);
    
    if (!need) {
      return res.status(404).json({ message: 'Need not found' });
    }
    
    // Check if user is the requester
    if (need.requester.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await need.deleteOne();
    
    res.json({ message: 'Need removed' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user needs
export const getUserNeeds = async (req, res) => {
  try {
    const needs = await Need.find({ requester: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json(needs);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
