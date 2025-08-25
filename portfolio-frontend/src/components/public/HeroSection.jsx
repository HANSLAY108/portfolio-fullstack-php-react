// src/components/public/HeroSection.jsx
import { Link } from 'react-router-dom';
import profilePic from '../../assets/react.svg';

const HeroSection = () => {
  return (
    // Use smaller padding on mobile, larger on bigger screens
    <section className="bg-white text-center py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Slightly smaller image on mobile */}
        <img
          src={profilePic}
          alt="Toh Hanslay"
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mx-auto border-4 border-white shadow-lg"
        />

        {/* Responsive heading sizes */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-6 text-gray-800">
          Toh Hanslay
        </h1>

        {/* Responsive text sizes */}
        <p className="text-md sm:text-lg md:text-xl text-gray-600 mt-4">
          Crafting exceptional web experiences with a passion for innovation.
        </p>

        <p className="max-w-2xl mx-auto mt-4 text-gray-500 leading-relaxed px-4 sm:px-0">
          I'm a full-stack developer dedicated to building high-performance, user-friendly, and visually appealing web applications. From front-end aesthetics to back-end logic, I deliver robust solutions.
        </p>

        {/* Buttons stack vertically on mobile, horizontally on larger screens */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Make buttons full-width on mobile, auto-width on larger screens */}
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-hover transition-all duration-300 shadow-lg"
          >
            Contact Me
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto bg-white text-gray-700 font-semibold px-8 py-3 rounded-md border border-gray-200 hover:bg-gray-100 transition-all duration-300 shadow-sm"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;