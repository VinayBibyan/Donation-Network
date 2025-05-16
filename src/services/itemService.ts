
import api, { apiFormData } from './api';
import { ItemListing } from '../types/models';

export interface ItemData {
  title: string;
  description: string;
  category: string;
  condition: string;
  image?: string;
  location?: string;
}

export interface Item extends ItemData {
  _id: string;
  owner: {
    _id: string;
    name: string;
    image: string;
    location?: string;
  };
  isAvailable: boolean;
  createdAt: string;
}

// Helper function to transform backend Item model to frontend ItemListing type
const transformItemToListing = (item: Item): ItemListing => {
  // Validate condition to ensure it matches the expected type
  const validConditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const condition = validConditions.includes(item.condition) 
    ? item.condition as "New" | "Like New" | "Good" | "Fair" | "Poor"
    : "Good"; // Default to "Good" if the condition is invalid
    
  return {
    id: item._id,
    title: item.title,
    description: item.description,
    category: item.category,
    condition: condition,
    images: [item.image || '/placeholder.svg'],
    location: item.location || '',
    donorId: item.owner._id,
    donorName: item.owner.name,
    donorAvatar: item.owner.image,
    isAvailable: item.isAvailable,
    createdAt: item.createdAt,
  };
};

// Function to create form data for item with image
const createItemFormData = (itemData: Partial<ItemData>, imageFile?: File | null) => {
  const formData = new FormData();
  
  if (itemData.title) formData.append('title', itemData.title);
  if (itemData.description) formData.append('description', itemData.description);
  if (itemData.category) formData.append('category', itemData.category);
  if (itemData.condition) formData.append('condition', itemData.condition);
  if (itemData.location) formData.append('location', itemData.location);
  
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  return formData;
};

export const itemService = {
  async getItems(filters: { 
    category?: string; 
    condition?: string; 
    search?: string;
  }): Promise<ItemListing[]> {
    const response = await api.get('/items', { params: filters });
    return response.data.map(transformItemToListing);
  },

  async getItemById(id: string): Promise<ItemListing> {
    const response = await api.get(`/items/${id}`);
    return transformItemToListing(response.data);
  },

  async createItem(itemData: ItemData, imageFile?: File | null): Promise<ItemListing> {
    if (imageFile) {
      // Use multipart form data if we have an image file
      const formData = createItemFormData(itemData, imageFile);
      const response = await apiFormData.post('/items', formData);
      return transformItemToListing(response.data);
    } else {
      // Use regular JSON if no image file
      const response = await api.post('/items', itemData);
      return transformItemToListing(response.data);
    }
  },

  async updateItem(id: string, itemData: Partial<ItemData> & { isAvailable?: boolean }, imageFile?: File | null): Promise<ItemListing> {
    if (imageFile) {
      // Use multipart form data if we have an image file
      const formData = createItemFormData(itemData, imageFile);
      if (itemData.isAvailable !== undefined) {
        formData.append('isAvailable', String(itemData.isAvailable));
      }
      const response = await apiFormData.put(`/items/${id}`, formData);
      return transformItemToListing(response.data);
    } else {
      // Use regular JSON if no image file
      const response = await api.put(`/items/${id}`, itemData);
      return transformItemToListing(response.data);
    }
  },

  async updateItemStatus(id: string, isAvailable: boolean): Promise<ItemListing> {
    const response = await api.put(`/items/${id}/status`, { isAvailable });
    return transformItemToListing(response.data);
  },

  async deleteItem(id: string): Promise<void> {
    await api.delete(`/items/${id}`);
  },

  async getUserItems(): Promise<ItemListing[]> {
    const response = await api.get('/items/user/items');
    return response.data.map(transformItemToListing);
  }
};

export default itemService;
