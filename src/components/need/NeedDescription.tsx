
import { Calendar } from "lucide-react";
import { NeedListing } from "@/types/models";

interface NeedDescriptionProps {
  need: NeedListing;
}

const NeedDescription = ({ need }: NeedDescriptionProps) => {
  return (
    <>
      {/* Image */}
      {need.recipientAvatar && need.recipientAvatar !== "/user.png" && (
        <div className="max-w-sm mx-auto">
          <img 
            src={need.recipientAvatar}
            alt={need.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>Posted {new Date(need.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-gray-700">{need.description}</p>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center gap-3">
          <img 
            src={need.recipientAvatar || "/user.png"} 
            alt={need.recipientName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{need.recipientName}</h3>
            <p className="text-sm text-gray-600">Recipient</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NeedDescription;
