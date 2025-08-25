// src/pages/public/HomePage.jsx
import React from 'react';

// Import all the section components for the home page
import HeroSection from '../../components/public/HeroSection';
import FeaturedProjects from '../../components/public/FeaturedProjects';
import HomepageSkills from '../../components/public/HomepageSkills'; // <-- Use our new component
import TestimonialsSection from '../../components/public/TestimonialsSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      
      <FeaturedProjects />
      
      {/* This now uses our new, specific skills component */}
      <HomepageSkills /> 
      
      <TestimonialsSection />
    </>
  );
};

export default HomePage;