
import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface StatusToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => Promise<void>;
  activeLabel?: string;
  inactiveLabel?: string;
  isItem?: boolean;
}

const StatusToggle = ({ 
  isActive, 
  onChange, 
  activeLabel = "Available", 
  inactiveLabel = "Claimed",
  isItem = true
}: StatusToggleProps) => {
  const [isPending, setIsPending] = useState(false);
  
  const handleChange = async () => {
    try {
      setIsPending(true);
      await onChange(!isActive);
      toast.success(`Status updated to ${!isActive ? activeLabel : inactiveLabel}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(`Failed to update status. Please try again.`);
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="status-toggle"
        checked={isActive}
        disabled={isPending}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="status-toggle" className="cursor-pointer">
        {isActive ? 
          (isItem ? "Available for donation" : "Request is active") : 
          (isItem ? "Item has been claimed" : "Request has been fulfilled")}
      </Label>
    </div>
  );
};

export default StatusToggle;
