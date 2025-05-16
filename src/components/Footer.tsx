
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white mt-12 py-8 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-donation-primary mb-4">
              <Heart className="h-6 w-6 fill-donation-primary text-white" />
              <span className="font-bold text-xl">Donation Network</span>
            </Link>
            <p className="text-sm text-gray-600">
              Connecting donors and recipients to create a community of sharing and support.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-donation-text">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-donation-primary">Home</Link></li>
              <li><Link to="/items" className="text-gray-600 hover:text-donation-primary">Browse Items</Link></li>
              <li><Link to="/needs" className="text-gray-600 hover:text-donation-primary">Browse Needs</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-donation-primary">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-donation-text">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="text-gray-600 hover:text-donation-primary">Login</Link></li>
              <li><Link to="/signup" className="text-gray-600 hover:text-donation-primary">Sign Up</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-donation-primary">My Profile</Link></li>
              <li><Link to="/messages" className="text-gray-600 hover:text-donation-primary">Messages</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-donation-text">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-600 hover:text-donation-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-donation-primary">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-donation-primary">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Donation Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
