
import api from './api';
import { Message, Conversation } from '../types/models';

const transformMessage = (message: any): Message => ({
  id: message._id,
  senderId: message.sender._id,
  recipientId: message.recipient._id,
  content: message.content,
  createdAt: message.createdAt,
  readAt: message.read ? new Date().toISOString() : undefined,
});

const transformConversation = (conversation: any): Conversation => ({
  id: conversation.user._id,
  participants: [
    {
      id: conversation.user._id,
      name: conversation.user.name,
      email: conversation.user.email || '',
      avatar: conversation.user.image || '',
      createdAt: conversation.user.createdAt
    }
  ],
  lastMessage: conversation.lastMessage ? {
    id: '',
    senderId: conversation.lastMessage.sender === 'me' ? '' : conversation.user._id,
    recipientId: conversation.lastMessage.sender === 'me' ? conversation.user._id : '',
    content: conversation.lastMessage.content,
    createdAt: conversation.lastMessage.createdAt,
  } : undefined,
  updatedAt: conversation.lastMessage?.createdAt || new Date().toISOString(),
});

export const messageService = {
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get('/messages/conversations');
    return response.data.map(transformConversation);
  },

  async getMessages(userId: string): Promise<Message[]> {
    const response = await api.get(`/messages/${userId}`);
    return response.data.map(transformMessage);
  },

  async sendMessage(userId: string, content: string): Promise<Message> {
    const response = await api.post(`/messages/${userId}`, { content });
    return transformMessage(response.data);
  }
};

export default messageService;
