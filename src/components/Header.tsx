import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Hand, Heart, Menu, X, LogOut, MessageCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-80 border-b border-indigo-100">
      <div className="container flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsMenuOpen(false)}
        >
          <Heart className="h-7 w-7 fill-rose-500 text-white group-hover:fill-rose-600 group-hover:scale-110 transition-all duration-300" />
          <span className="font-bold text-2xl bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Donation Network
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/items" 
            className="text-gray-600 hover:text-rose-600 transition-colors font-medium hover:scale-105 active:scale-95"
          >
            <span className="relative group">
              Donate Items
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <Link 
            to="/needs" 
            className="text-gray-600 hover:text-purple-600 transition-colors font-medium hover:scale-105 active:scale-95"
          >
            <span className="relative group">
            Community Requests
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          {isAuthenticated && (
            <Link 
              to="/messages" 
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium hover:scale-105 active:scale-95"
            >
              <span className="relative group flex items-center gap-1">
                <MessageCircle className="w-5 h-5" />
                Messages
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          )}
          <div className="flex items-center gap-4 ml-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 flex items-center justify-center text-rose-600 font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="text-gray-700 font-medium">Hi, {user?.name}</span>
                </div>
                <Button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-rose-200 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 transition-all">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-200 transition-all">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 p-2 rounded-full hover:bg-purple-50 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-rose-600" />
          ) : (
            <Menu className="w-6 h-6 text-purple-600" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-white to-indigo-50 shadow-xl animate-fade-in-down border-t border-indigo-100">
          <div className="container flex flex-col py-4 gap-4">
            <Link 
              to="/items" 
              className="text-gray-700 hover:text-rose-600 transition-colors py-3 px-4 rounded-lg hover:bg-rose-50 font-medium flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Hand className="w-5 h-5 text-rose-500" />
              Donate Items
            </Link>
            <Link 
              to="/needs" 
              className="text-gray-700 hover:text-purple-600 transition-colors py-3 px-4 rounded-lg hover:bg-purple-50 font-medium flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-5 h-5 text-purple-500" />
              Community Requests
            </Link>
            {isAuthenticated && (
              <Link 
                to="/messages" 
                className="text-gray-700 hover:text-indigo-600 transition-colors py-3 px-4 rounded-lg hover:bg-indigo-50 font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5 text-indigo-500" />
                Messages
              </Link>
            )}
            <div className="flex flex-col gap-3 mt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 flex items-center justify-center text-rose-600 font-bold text-lg">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Hi, {user?.name}</p>
                      <p className="text-sm text-gray-500">Welcome back!</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleLogout} 
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-rose-200 transition-all py-3"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 transition-all py-3"
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-200 transition-all py-3"
                  >
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;