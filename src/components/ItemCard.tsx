import { ItemListing } from "../types/models";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Share2, Clock } from "lucide-react";

interface ItemCardProps {
  item: ItemListing;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={`/items/${item.id}`}>
        <Card className="overflow-hidden donation-card h-full flex flex-col border-2 border-gray-100 hover:border-donation-primary/30 transition-all duration-300 group">
          <div className="aspect-square relative overflow-hidden">
            <motion.img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              whileHover={{ scale: 1.05 }}
            />
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse">
                  Claimed
                </Badge>
              </div>
            )}
            <div className="absolute top-3 right-3 flex gap-2">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  // Share functionality would go here
                }}
              >
                <Share2 className="h-4 w-4 text-gray-700" />
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  // Like functionality would go here
                }}
              >
                <Heart className="h-4 w-4 text-gray-700 hover:text-red-500" />
              </motion.button>
            </div>
            {item.createdAt && (
              <div className="absolute bottom-3 left-3">
                <Badge className="flex items-center gap-1 bg-white text-gray-800 hover:bg-gray-100">
                  <Clock className="h-3 w-3" />
                  <span>{item.condition}</span>
                </Badge>
              </div>
            )}
          </div>
          
          <CardContent className="pt-4 flex-1">
            <Badge className="mb-2 bg-gradient-to-r from-donation-primary to-purple-500 hover:from-donation-secondary hover:to-purple-600 text-white">
              {item.category}
            </Badge>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-donation-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-donation-primary"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{item.location}</span>
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-3 flex items-center gap-2 text-sm text-gray-600 bg-gray-50/50 group-hover:bg-gray-100/50 transition-colors">
            <motion.img 
              src={item.donorAvatar || "/user.png"} 
              alt={item.donorName}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              whileHover={{ scale: 1.1 }}
            />
            <span className="group-hover:text-donation-primary transition-colors">
              Offered by <span className="font-medium">{item.donorName}</span>
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ItemCard;