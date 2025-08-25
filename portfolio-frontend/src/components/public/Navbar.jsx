// src/components/public/Navbar.jsx
import { useState } from 'react'; // 1. Import useState for menu toggle
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import Menu and X icons

const Navbar = () => {
  // 2. State to manage the mobile menu's open/closed status
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#8B5CF6' : '#374151',
  });

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          Toh Hanslay
        </NavLink>

        {/* Desktop Navigation Links (hidden on mobile) */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700">
          <li><NavLink to="/" style={navLinkStyles}>Home</NavLink></li>
          <li><NavLink to="/about" style={navLinkStyles}>About</NavLink></li>
          <li><NavLink to="/projects" style={navLinkStyles}>Projects</NavLink></li>
          <li><NavLink to="/services" style={navLinkStyles}>Services</NavLink></li>
          <li><NavLink to="/contact" style={navLinkStyles}>Contact</NavLink></li>
        </ul>

       

        {/* Mobile Menu Button (only visible on mobile) */}
        <button className="md:hidden text-gray-700 z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 3. Mobile Menu Overlay */}
        <div
          className={`
            md:hidden fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <li><NavLink to="/" style={navLinkStyles} onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" style={navLinkStyles} onClick={() => setIsOpen(false)}>About</NavLink></li>
            <li><NavLink to="/projects" style={navLinkStyles} onClick={() => setIsOpen(false)}>Projects</NavLink></li>
            <li><NavLink to="/services" style={navLinkStyles} onClick={() => setIsOpen(false)}>Services</NavLink></li>
            <li><NavLink to="/contact" style={navLinkStyles} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;