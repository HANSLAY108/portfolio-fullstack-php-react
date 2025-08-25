import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Download } from 'lucide-react';
import { getProfile } from '../../api/profileApi'; // Import the function to get profile data

/**
 * CTASection Component
 * 
 * A self-contained Call-to-Action section. It dynamically fetches the
 * resume URL from the backend and provides a download button.
 */
const CTASection = () => {
  // State to hold just the resume URL string.
  const [resumeUrl, setResumeUrl] = useState('');
  
  // State for the scroll-triggered animation.
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // useEffect hook to fetch the profile data when the component first loads.
  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const profileData = await getProfile();
        // Check if the data and the resume_url property exist.
        if (profileData && profileData.resume_url) {
          // Construct the full, absolute URL to the file on the server.
          // This must match your XAMPP folder structure.
          const fullUrl = `http://localhost/portfolio/portfolio-backend${profileData.resume_url}`;
          setResumeUrl(fullUrl);
        }
      } catch (error) {
        console.error("Failed to fetch resume URL for CTA section:", error);
      }
    };

    fetchResumeUrl();
  }, []); // The empty dependency array [] ensures this hook runs only once.

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Animated container */}
        <div
          className={`
            max-w-3xl mx-auto text-center bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 transition-all duration-700 ease-out
            ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Ready for the Next Challenge?
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            If my skills and experience align with your needs, I would love to connect! Download my CV for a detailed overview of my professional journey.
          </p>

          {/* Download Button */}
          <div className="mt-8">
            {/* 
              This section is now conditional. The download button will only
              be rendered if a resumeUrl has been successfully fetched.
            */}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                download // This HTML attribute tells the browser to download the file.
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-hover transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                <Download size={20} />
                <span>Download My CV</span>
              </a>
            ) : (
              // If no resumeUrl is available, a simple message is shown instead.
              <p className="text-sm text-gray-500">
                CV is not available for download at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;