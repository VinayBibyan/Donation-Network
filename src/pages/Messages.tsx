import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import messageService from "../services/messageService";
import { Message, Conversation } from "../types/models";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch conversations
  const { data: conversations = [], isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: messageService.getConversations
  });

  // Fetch messages for selected conversation
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', selectedConversation?.id],
    queryFn: () => selectedConversation ? messageService.getMessages(selectedConversation.id) : Promise.resolve([]),
    enabled: !!selectedConversation
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ userId, content }: { userId: string, content: string }) => 
      messageService.sendMessage(userId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', selectedConversation?.id] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setNewMessage("");
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) {
      return;
    }
    
    sendMessageMutation.mutate({
      userId: selectedConversation.id,
      content: newMessage.trim()
    });
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Your Messages
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
          {/* Conversations List */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <h2 className="font-semibold text-lg text-purple-800">Conversations</h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-56px)] scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
              {isLoadingConversations ? (
                <div className="p-4 text-center space-y-2">
                  <div className="animate-pulse flex space-x-4 justify-center">
                    <div className="rounded-full bg-purple-100 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 max-w-[200px]">
                      <div className="h-4 bg-purple-100 rounded"></div>
                      <div className="h-3 bg-purple-100 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="animate-pulse flex space-x-4 justify-center">
                    <div className="rounded-full bg-purple-100 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 max-w-[200px]">
                      <div className="h-4 bg-purple-100 rounded"></div>
                      <div className="h-3 bg-purple-100 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ) : conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-3 border-b border-gray-100 cursor-pointer transition-all duration-300 ${
                    selectedConversation?.id === conversation.id 
                      ? 'bg-gradient-to-r from-purple-50 to-indigo-50 shadow-inner' 
                      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img 
                        src={conversation.participants[0]?.avatar || "/user.png"} 
                        alt={conversation.participants[0]?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-gray-800">{conversation.participants[0]?.name}</h3>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-400">
                        {formatMessageTime(conversation.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="md:col-span-2 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={selectedConversation.participants[0]?.avatar || "/user.png"} 
                      alt={selectedConversation.participants[0]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-800">{selectedConversation.participants[0]?.name}</h3>
                    <p className="text-xs text-purple-600">Online</p>
                  </div>
                </div>
                
                {/* Messages List */}
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://transparenttextures.com/patterns/light-wool.png')]"
                  style={{ backgroundBlendMode: 'soft-light' }}
                >
                  {isLoadingMessages ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="animate-bounce">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                          <Send className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-500">Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center mb-4">
                        <Send className="w-8 h-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No messages yet</h3>
                      <p className="text-gray-500 max-w-md">
                        Start the conversation with {selectedConversation.participants[0]?.name.split(' ')[0]} by sending your first message.
                      </p>
                    </div>
                  ) : (
                    messages.map((message: Message) => {
                      const isCurrentUser = message.senderId === user._id;
                      
                      return (
                        <div 
                          key={message.id} 
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="max-w-[70%]">
                            <div 
                              className={`p-3 rounded-2xl ${
                                isCurrentUser 
                                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-br-none'
                                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                              }`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <div className={`text-xs mt-1 ${
                              isCurrentUser ? 'text-right text-purple-300' : 'text-left text-gray-400'
                            }`}>
                              {formatMessageTime(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                {/* Message Input */}
                <div className="p-3 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 rounded-full border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-purple-300 bg-white"
                    />
                    <Button 
                      type="submit"
                      size="icon"
                      disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md transition-all hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-white to-gray-50">
                <div className="text-center p-8 max-w-md">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-5 inline-flex mb-4 shadow-inner">
                    <User className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-gray-800">No conversation selected</h3>
                  <p className="text-gray-600 mb-6">
                    Select a conversation from the sidebar or start a new one to begin messaging.
                  </p>
                  <div className="animate-bounce text-purple-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;