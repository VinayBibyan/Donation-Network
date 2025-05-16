
import Item from '../models/Item.js';

// Get all items
export const getItems = async (req, res) => {
  try {
    const { category, condition, search } = req.query;
    const query = { isAvailable: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (condition && condition !== 'any') {
      query.condition = condition;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const items = await Item.find(query)
      .populate('owner', 'name image location')
      .sort({ createdAt: -1 });
      
    res.json(items);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'name image location');
      
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const { title, description, category, condition, location } = req.body;
    
    // Handle image upload
    let imagePath = '';
    if (req.file) {
      imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const item = new Item({
      title,
      description,
      category,
      condition,
      image: imagePath || 'https://via.placeholder.com/300',
      location,
      owner: req.user.id
    });
    
    const createdItem = await item.save();
    
    res.status(201).json(createdItem);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const { title, description, category, condition, location, isAvailable } = req.body;
    
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user is the owner
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    item.title = title || item.title;
    item.description = description || item.description;
    item.category = category || item.category;
    item.condition = condition || item.condition;
    item.location = location || item.location;
    item.isAvailable = isAvailable !== undefined ? isAvailable : item.isAvailable;
    
    // Handle image upload
    if (req.file) {
      item.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const updatedItem = await item.save();
    
    res.json(updatedItem);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update item status
export const updateItemStatus = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user is the owner
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    item.isAvailable = isAvailable;
    
    const updatedItem = await item.save();
    
    res.json(updatedItem);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user is the owner
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await item.deleteOne();
    
    res.json({ message: 'Item removed' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user items
export const getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json(items);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
