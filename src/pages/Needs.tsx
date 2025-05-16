import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import NeedCard from "../components/NeedCard";
import { mockCategories } from "../data/mockData";
import needService from "../services/needService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Search, PlusCircle, FilterX, AlertCircle, Clock } from "lucide-react";

const Needs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedUrgency, setSelectedUrgency] = useState<string>("");
  
  const { data: needs = [], isLoading, refetch } = useQuery({
    queryKey: ['needs', selectedCategory, selectedUrgency, searchTerm],
    queryFn: () => needService.getNeeds({ 
      category: selectedCategory, 
      urgency: selectedUrgency,
      search: searchTerm
    })
  });

  const handleSearch = () => {
    refetch();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedUrgency("");
  };

  return (
    <Layout>
      <div className="container py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-donation-primary to-purple-600 bg-clip-text text-transparent">
              Community Requests
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Browse requests from people in your community who need specific items. See if you can help!
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-gradient-to-r from-donation-primary to-purple-600 hover:from-donation-secondary hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all group">
            <a href="/needs/add" className="flex items-center gap-1">
              <PlusCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Request an Item</span>
            </a>
          </Button>
        </motion.div>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-gray-700 font-medium">Search Requests</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="hover:border-donation-primary/50">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="border-gray-200">
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map(category => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="hover:bg-donation-light focus:bg-donation-light"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency" className="text-gray-700 font-medium">Priority</Label>
              <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <SelectTrigger id="urgency" className="hover:border-donation-primary/50">
                  <SelectValue placeholder="Any Priority" />
                </SelectTrigger>
                <SelectContent className="border-gray-200">
                  <SelectItem value="any">Any Priority</SelectItem>
                  <SelectItem 
                    value="Low"
                    className="hover:bg-blue-50 focus:bg-blue-50"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="Medium"
                    className="hover:bg-yellow-50 focus:bg-yellow-50"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem 
                    value="High"
                    className="hover:bg-red-50 focus:bg-red-50"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 fill-red-500" />
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-donation-primary to-purple-600 hover:from-donation-secondary hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Requests
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                variant="outline"
                onClick={handleClearFilters}
                className="border-gray-300 hover:border-donation-primary text-gray-700 hover:text-donation-primary transition-all flex items-center gap-1"
              >
                <FilterX className="h-4 w-4" />
                Clear Filters
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Results */}
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="spinner h-12 w-12 mx-auto mb-4 border-4 border-donation-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading community requests...</p>
          </motion.div>
        ) : needs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-donation-light rounded-full flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-donation-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Requests Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="border-gray-300 hover:border-donation-primary text-gray-700 hover:text-donation-primary transition-all"
                >
                  <FilterX className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {needs.map((need, index) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NeedCard need={need} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Needs;