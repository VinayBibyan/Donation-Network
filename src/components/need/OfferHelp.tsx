
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NeedListing } from "@/types/models";
import { toast } from "sonner";
import messageService from "../../services/messageService";

interface OfferHelpProps {
  need: NeedListing;
  isAuthenticated: boolean;
}

const OfferHelp = ({ need, isAuthenticated }: OfferHelpProps) => {
  const [offerMessage, setOfferMessage] = useState("");
  
  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to offer help");
      return;
    }
    
    if (!offerMessage.trim()) {
      toast.error("Please enter a message with your offer to help.");
      return;
    }
    
    try {
      // Send a message to the need requester
      await messageService.sendMessage(
        need.recipientId,
        `Offer to help with "${need.title}": ${offerMessage}`
      );
      
      toast.success("Your offer has been sent!");
      setOfferMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send your offer. Please try again.");
    }
  };

  if (need.isFulfilled) {
    return (
      <div className="border-t pt-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="font-medium mb-2">This request has been fulfilled</p>
          <Button asChild variant="outline">
            <a href="/needs">Browse Other Requests</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-4">
      <h3 className="font-medium mb-4">Offer to Help</h3>
      <form onSubmit={handleSubmitOffer}>
        <Textarea
          placeholder="Describe what you can offer to help with this request..."
          className="mb-4"
          value={offerMessage}
          onChange={(e) => setOfferMessage(e.target.value)}
        />
        <div className="flex gap-3">
          <Button type="submit" className="bg-donation-primary hover:bg-donation-secondary">
            Send Offer
          </Button>
          <Button type="button" variant="outline" asChild>
            <a href={`/messages?user=${need.recipientId}`}>Message Requester</a>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfferHelp;
