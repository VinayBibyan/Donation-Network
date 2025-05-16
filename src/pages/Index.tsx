import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ItemCard from "../components/ItemCard";
import NeedCard from "../components/NeedCard";
import { mockCategories } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Hand, Heart, HandHeart, Users, ArrowRight } from "lucide-react";
import itemService from "../services/itemService";
import needService from "../services/needService";

const Index = () => {
  const { data: items = [] } = useQuery({
    queryKey: ['featured-items'],
    queryFn: () => itemService.getItems({})
  });

  const { data: needs = [] } = useQuery({
    queryKey: ['featured-needs'],
    queryFn: () => needService.getNeeds({})
  });

  // Get only the first 4 items and needs for preview
  const featuredItems = items.slice(0, 4);
  const featuredNeeds = needs.slice(0, 4);

  return (
    <Layout>
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Donation Network makes it easy to donate items you no longer need and find things you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-14 w-14 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">List Items to Donate</h3>
              <p className="text-gray-600 mb-4">
                Post photos and descriptions of items you want to give away to someone who needs them.
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center text-pink-600 font-medium">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-14 w-14 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md">
                <Hand className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Request What You Need</h3>
              <p className="text-gray-600 mb-4">
                Create listings for items you need, or browse available donations and send requests.
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center text-blue-600 font-medium">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-14 w-14 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Connect & Arrange Pickup</h3>
              <p className="text-gray-600 mb-4">
                Message other users to arrange pickup or delivery of items in your community.
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center text-green-600 font-medium">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Donations Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Featured Donations</h2>
              <p className="text-gray-600">Quality items looking for new homes</p>
            </div>
            <Button asChild variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
              <Link to="/items" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Needs Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Current Needs</h2>
              <p className="text-gray-600">Help fulfill these community requests</p>
            </div>
            <Button asChild variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50 hover:text-purple-700">
              <Link to="/needs" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredNeeds.map(need => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find exactly what you're looking for or discover where you can help others.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mockCategories.map((category, index) => {
              const colors = [
                'bg-blue-100 hover:bg-blue-200 text-blue-800',
                'bg-green-100 hover:bg-green-200 text-green-800',
                'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
                'bg-red-100 hover:bg-red-200 text-red-800',
                'bg-purple-100 hover:bg-purple-200 text-purple-800',
                'bg-pink-100 hover:bg-pink-200 text-pink-800',
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <Link 
                  key={category} 
                  to={`/items?category=${category}`}
                  className={`${colorClass} rounded-xl p-6 text-center transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center font-medium`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r bg-secondary text-black py-24">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-10 opacity-90">
              Join our community today and start sharing kindness. Every donation helps someone in need and builds a stronger community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 hover:text-blue-700 shadow-lg hover:shadow-xl transition-all">
                <Link to="/signup" className="flex items-center">
                  Create an Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-blue-500 hover:border-blue-500 hover:text-white shadow-lg hover:shadow-xl transition-all">
                <Link to="/about" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;