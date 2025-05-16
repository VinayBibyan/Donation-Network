import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-donation-light to-indigo-50 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-donation-primary/10 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-indigo-200/30 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-teal-200/30 blur-xl"></div>
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-2 rounded-full inline-flex items-center gap-2 text-sm shadow-sm hover:shadow-md transition-all"
            >
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-gradient-to-r from-donation-primary to-pink-500 text-white p-1 rounded-full"
              >
                <Heart className="h-4 w-4" />
              </motion.div>
              <span>Join our community of giving</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-donation-text"
            >
              Share kindness, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-donation-primary to-purple-600">
                build community
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 max-w-md"
            >
              Connect with neighbors to give and receive items freely. Support each other and reduce waste together.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-donation-primary to-purple-600 hover:from-donation-secondary hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/items" className="text-base flex items-center gap-1">
                  Start Donating <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-donation-primary text-donation-primary hover:bg-donation-light hover:text-donation-secondary hover:border-donation-secondary transition-all group"
              >
                <Link to="/needs" className="text-base flex items-center gap-1">
                  Browse Needs 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="hidden md:block bg-white p-4 rounded-xl shadow-xl hover:shadow-2xl transition-all border-2 border-white hover:border-donation-primary/20"
          >
            <img 
              src="/hero.png" 
              alt="People sharing items" 
              className="rounded-lg w-full h-auto transform hover:scale-[1.01] transition-transform"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;