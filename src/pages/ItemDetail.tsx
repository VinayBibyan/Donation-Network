import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, MapPin } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import itemService from "../services/itemService";
import { useAuth } from "../hooks/useAuth";
import messageService from "../services/messageService";
import StatusToggle from "../components/StatusToggle";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [requestMessage, setRequestMessage] = useState("");
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: item, isLoading, error } = useQuery({
    queryKey: ['item', id],
    queryFn: () => itemService.getItemById(id || ''),
    enabled: !!id
  });
  
  const isOwner = user && item && user._id === item.donorId;

  const updateItemStatus = async (isAvailable: boolean) => {
    if (id) {
      await itemService.updateItemStatus(id, isAvailable);
      queryClient.invalidateQueries({ queryKey: ['item', id] });
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <div className="spinner h-12 w-12 mx-auto mb-4"></div>
          <p>Loading item details...</p>
        </div>
      </Layout>
    );
  }
  
  if (error || !item) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
          <p className="mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/items">Browse Other Items</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to request this item");
      return;
    }
    
    if (!requestMessage.trim()) {
      toast.error("Please enter a message for the donor.");
      return;
    }
    
    try {
      await messageService.sendMessage(
        item.donorId, 
        `Request for "${item.title}": ${requestMessage}`
      );
      
      toast.success("Your request has been sent to the donor!");
      setRequestMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={item.images[0]} 
                alt={item.title}
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-donation-primary hover:bg-donation-secondary">
                  {item.category}
                </Badge>
                <Badge variant="outline">
                  {item.condition}
                </Badge>
                {!item.isAvailable && (
                  <Badge variant="destructive">
                    Claimed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold">{item.title}</h1>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Posted {new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center gap-3">
                <img 
                  src={item.donorAvatar || "/user.png"} 
                  alt={item.donorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{item.donorName}</h3>
                  <p className="text-sm text-gray-600">Donor</p>
                </div>
              </div>
            </div>
            
            {isOwner && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Item Status</h3>
                <StatusToggle 
                  isActive={item.isAvailable}
                  onChange={updateItemStatus}
                  isItem={true}
                />
              </div>
            )}
            
            {!isOwner && (
              <>
                {item.isAvailable ? (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">Request This Item</h3>
                    <form onSubmit={handleSubmitRequest}>
                      <Textarea
                        placeholder="Introduce yourself and explain why you need this item..."
                        className="mb-4"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <Button type="submit" className="bg-donation-primary hover:bg-donation-secondary">
                          Submit Request
                        </Button>
                        <Button type="button" variant="outline" asChild>
                          <a href={`/messages?user=${item.donorId}`}>Message Donor</a>
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="border-t pt-4">
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                      <p className="font-medium mb-2">This item has been claimed</p>
                      <Button asChild variant="outline">
                        <a href="/items">Browse Other Items</a>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
