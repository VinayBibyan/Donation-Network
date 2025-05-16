
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  createdAt: string;
}

export interface ItemListing {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  images: string[];
  location: string;
  donorId: string;
  donorName: string;
  donorAvatar?: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface NeedListing {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "Low" | "Medium" | "High";
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  isFulfilled: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface Request {
  id: string;
  itemId?: string;
  needId?: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  message: string;
  status: "Pending" | "Accepted" | "Declined";
  createdAt: string;
}
