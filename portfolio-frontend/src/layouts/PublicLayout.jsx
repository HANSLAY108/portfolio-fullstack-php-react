import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

/**
 * PublicLayout Component
 * 
 * This component acts as a template for all public pages on the website.
 * It includes the shared Navbar and Footer components, and a main content area
 * where the specific page's content will be rendered.
 * 
 * The <Outlet /> component is a special component from react-router-dom that
 * renders the matched child route's element. For example, if the current URL is '/',
 * the <Outlet /> will render the <HomePage /> component. If the URL is '/about',
 * it will render the <AboutPage /> component.
 */
const PublicLayout = () => {
  return (
    // Main container div with a light gray background color that takes up at least the full height of the screen.
    <div className="bg-gray-50 min-h-screen">
      
      {/* The Navbar component is placed at the top of every page within this layout. */}
      <Navbar />
      
      {/* The <main> tag semantically defines the primary content of the document. */}
      <main>
        
        {/* The Outlet component from react-router-dom will be replaced by the component
            that matches the current route defined in App.jsx. */}
        <Outlet />
        
      </main>
      
      {/* The Footer component is placed at the bottom of every page within this layout. */}
      <Footer />
      
    </div>
  );
};

// Exporting the component so it can be imported and used in other files, like App.jsx.
export default PublicLayout;