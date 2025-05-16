import { NeedListing } from "../types/models";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Share2, Clock, AlertCircle, CheckCircle } from "lucide-react";

interface NeedCardProps {
  need: NeedListing;
}

const NeedCard = ({ need }: NeedCardProps) => {
  const urgencyColor = {
    Low: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    High: "bg-red-100 text-red-800 hover:bg-red-200"
  };

  const urgencyIcon = {
    Low: <Clock className="h-3 w-3" />,
    Medium: <AlertCircle className="h-3 w-3" />,
    High: <AlertCircle className="h-3 w-3 fill-red-800 text-red-800" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={`/needs/${need.id}`}>
        <Card className="overflow-hidden donation-card h-full flex flex-col border-2 border-gray-100 hover:border-donation-primary/30 transition-all duration-300 group">
          <CardContent className="pt-4 flex-1">
            <div className="flex justify-between items-start mb-3">
              <Badge className="bg-gradient-to-r from-donation-primary to-purple-500 hover:from-donation-secondary hover:to-purple-600 text-white">
                {need.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`${urgencyColor[need.urgency]} flex items-center gap-1 transition-colors`}
              >
                {urgencyIcon[need.urgency]}
                <span>{need.urgency} Priority</span>
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-donation-primary transition-colors">
              {need.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {need.description}
            </p>
            
            <div className="flex justify-between items-center">
              {need.isFulfilled ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Fulfilled</span>
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                  <span>Help Needed</span>
                </Badge>
              )}
              
              <div className="flex gap-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-100 rounded-full shadow-sm hover:bg-gray-200 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    // Share functionality would go here
                  }}
                >
                  <Share2 className="h-4 w-4 text-gray-700" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-100 rounded-full shadow-sm hover:bg-gray-200 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    // Like functionality would go here
                  }}
                >
                  <Heart className="h-4 w-4 text-gray-700 hover:text-red-500" />
                </motion.button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-3 flex items-center gap-2 text-sm text-gray-600 bg-gray-50/50 group-hover:bg-gray-100/50 transition-colors">
            <motion.img 
              src={need.recipientAvatar || "/user.png"} 
              alt={need.recipientName}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              whileHover={{ scale: 1.1 }}
            />
            <span className="group-hover:text-donation-primary transition-colors">
              Requested by <span className="font-medium">{need.recipientName}</span>
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default NeedCard;