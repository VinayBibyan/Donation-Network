
import api, { apiFormData } from './api';
import { NeedListing } from '../types/models';

export interface NeedData {
  title: string;
  description: string;
  category: string;
  urgency: string;
  image?: string;
  location?: string;
}

export interface Need extends NeedData {
  _id: string;
  requester: {
    _id: string;
    name: string;
    image: string;
    location?: string;
  };
  isActive: boolean;
  createdAt: string;
}

// Helper function to transform backend Need model to frontend NeedListing type
const transformNeedToListing = (need: Need): NeedListing => {
  return {
    id: need._id,
    title: need.title,
    description: need.description,
    category: need.category,
    urgency: need.urgency as "Low" | "Medium" | "High",
    recipientId: need.requester._id,
    recipientName: need.requester.name,
    recipientAvatar: need.requester.image,
    isFulfilled: !need.isActive,
    createdAt: need.createdAt,
  };
};

// Function to create form data for need with image
const createNeedFormData = (needData: Partial<NeedData>, imageFile?: File | null) => {
  const formData = new FormData();
  
  if (needData.title) formData.append('title', needData.title);
  if (needData.description) formData.append('description', needData.description);
  if (needData.category) formData.append('category', needData.category);
  if (needData.urgency) formData.append('urgency', needData.urgency);
  if (needData.location) formData.append('location', needData.location);
  
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  return formData;
};

export const needService = {
  async getNeeds(filters: { 
    category?: string; 
    urgency?: string; 
    search?: string;
  }): Promise<NeedListing[]> {
    const response = await api.get('/needs', { params: filters });
    return response.data.map(transformNeedToListing);
  },

  async getNeedById(id: string): Promise<NeedListing> {
    const response = await api.get(`/needs/${id}`);
    return transformNeedToListing(response.data);
  },

  async createNeed(needData: NeedData, imageFile?: File | null): Promise<NeedListing> {
    if (imageFile) {
      // Use multipart form data if we have an image file
      const formData = createNeedFormData(needData, imageFile);
      const response = await apiFormData.post('/needs', formData);
      return transformNeedToListing(response.data);
    } else {
      // Use regular JSON if no image file
      const response = await api.post('/needs', needData);
      return transformNeedToListing(response.data);
    }
  },

  async updateNeed(id: string, needData: Partial<NeedData> & { isActive?: boolean }, imageFile?: File | null): Promise<NeedListing> {
    if (imageFile) {
      // Use multipart form data if we have an image file
      const formData = createNeedFormData(needData, imageFile);
      if (needData.isActive !== undefined) {
        formData.append('isActive', String(needData.isActive));
      }
      const response = await apiFormData.put(`/needs/${id}`, formData);
      return transformNeedToListing(response.data);
    } else {
      // Use regular JSON if no image file
      const response = await api.put(`/needs/${id}`, needData);
      return transformNeedToListing(response.data);
    }
  },

  async updateNeedStatus(id: string, isActive: boolean): Promise<NeedListing> {
    const response = await api.put(`/needs/${id}/status`, { isActive });
    return transformNeedToListing(response.data);
  },

  async deleteNeed(id: string): Promise<void> {
    await api.delete(`/needs/${id}`);
  },

  async getUserNeeds(): Promise<NeedListing[]> {
    const response = await api.get('/needs/user/needs');
    return response.data.map(transformNeedToListing);
  }
};

export default needService;
