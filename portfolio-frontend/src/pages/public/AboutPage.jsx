import React from 'react';
import { useInView } from 'react-intersection-observer';
import aboutIllustration from '../../assets/about-illustration.svg';
import JourneySection from '../../components/public/JourneySection';
import ExpertiseSection from '../../components/public/ExpertiseSection'; // <-- 1. Import it
import CTASection from '../../components/common/CTASection'; // <-- 1. Import it

/**
 * AboutPage Component
 * 
 * This component renders the entire "About" page. It is composed of two main parts:
 * 1. An introductory section with a title and a descriptive paragraph alongside an illustration.
 * 2. The "Journey & Milestones" section, which is imported from the JourneySection component.
 * 
 * It uses the `react-intersection-observer` hook to trigger a fade-in animation for the
 * main introductory card when it becomes visible to the user.
 */
const AboutPage = () => {
  // Setup for the scroll-triggered animation on the main card.
  const { ref, inView } = useInView({
    triggerOnce: true, // The animation will only happen once.
    threshold: 0.1,    // Trigger when 10% of the element is visible.
  });

  return (
    // We use a React Fragment (<>) to return multiple sibling elements without adding an extra div to the DOM.
    <>
      {/* 
        This div serves as the container for the top section of the page.
        It has a white background and padding.
      */}
      <div className="bg-white pt-12 sm:pt-16">
        <div className="container mx-auto px-4">
          
          {/* Page Title: "About Me" */}
          <h1 className="text-2xl font-bold text-gray-400 mb-8 ml-2 sm:ml-0">
           
          </h1>
          
          {/* 
            This is the main content card. The `ref` is attached here for the animation hook.
            Conditional classes are applied based on the `inView` state to control the animation.
          */}
          <div
            ref={ref}
            className={`
              bg-white rounded-xl shadow-lg p-8 md:p-12 transition-all duration-700 ease-out
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="text-gray-700">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Turning Ideas into
                  <br />
                  <span className="text-primary">Digital Realities</span>
                </h2>
                <p className="mt-6 text-md md:text-lg leading-relaxed">
                  Hello, I'm Toh Hanslay, a passionate Full-Stack Developer with a knack for crafting robust, scalable web applications and engaging user experiences. With a strong foundation in the industry, I thrive on solving complex problems and bringing innovative solutions to life.
                </p>
                <p className="mt-4 text-md md:text-lg leading-relaxed">
                  My journey has taken me through various technologies, allowing me to build comprehensive systems from database to user interface. I believe in clean code, efficient design, and continuous learning to stay at the forefront of web development. Let's build something amazing together.
                </p>
              </div>
              
              {/* Right Column: Illustration Image */}
              <div className="flex justify-center items-center">
                <img 
                  src={aboutIllustration} 
                  alt="Developer Illustration" 
                  className="w-full max-w-sm lg:max-w-md"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* 
        The JourneySection component is rendered here, directly below the top section.
        This component contains the "My Journey & Milestones" timeline.
      */}
     <JourneySection />

      <ExpertiseSection />

      <CTASection /> {/* <-- 2. Add the new section here */}
    </>
  );
};

export default AboutPage;