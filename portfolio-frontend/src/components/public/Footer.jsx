// src/components/public/Footer.jsx
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Side Links */}
        <div className="text-sm text-gray-600 flex gap-4">
          <Link to="#" className="hover:text-primary">Product</Link>
          <Link to="#" className="hover:text-primary">Resources</Link>
          <Link to="#" className="hover:text-primary">Legal</Link>
          <Link to="/contact" className="hover:text-primary">Contact Us</Link>
        </div>
        
        {/* Right Side Social Icons */}
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
      <div className="bg-gray-50 text-center py-2">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Toh Hanslay. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;