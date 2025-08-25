import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, Clock, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { mockContactInfo } from '../../data/mockData';
import LocationSection from '../../components/public/LocationSection';
import { sendMessage } from '../../api/messagesApi'; // Import the new API function

/**
 * ContactPage Component
 * 
 * Renders the public contact page. It includes a header, a contact form,
 * contact information, and a location map. It is now connected to the backend
 * API to send messages.
 */
const ContactPage = () => {
  // State to hold the values of the form fields.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // State to disable the submit button during the submission process.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // A single handler to update the form state based on user input.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  /**
   * Handles the form submission by sending the data to the backend API.
   * @param {React.FormEvent} e The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading.
    setIsSubmitting(true);
    
    try {
      // Call the API function to send the form data to the PHP backend.
      await sendMessage(formData);
      
      // On success, show a notification and clear the form.
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      // If the API call fails, show an error notification.
      console.error("Failed to send message:", error);
      toast.error('Sorry, there was an error sending your message. Please try again.');
      
    } finally {
      // Re-enable the submit button regardless of success or failure.
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          
          {/* Page Header */}
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
              Let's <span className="text-primary">Connect</span>
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you have a project idea, a question, or just want to say hello, I'd love to hear from you.
            </p>
          </header>

          {/* Main Content Grid: Form and Contact Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Contact Form Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Me a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-hover transition-all duration-300 shadow-lg disabled:bg-primary/70 disabled:cursor-not-allowed">
                    <Send size={18} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Get in Touch Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <ContactInfoItem icon={<Mail size={20} />} label="Email Address" value={mockContactInfo.email} href={`mailto:${mockContactInfo.email}`} />
                <ContactInfoItem icon={<Phone size={20} />} label="Phone Number" value={mockContactInfo.phone} href={`tel:${mockContactInfo.phone}`} />
                <ContactInfoItem icon={<Clock size={20} />} label="Availability" value={mockContactInfo.availability} />
              </div>
              
              <div className="border-t border-gray-200 my-8"></div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Connect with Me</h3>
              <div className="flex gap-4">
                <SocialLink href={mockContactInfo.socials.github} icon={<Github size={20} />} />
                <SocialLink href={mockContactInfo.socials.linkedin} icon={<Linkedin size={20} />} />
                <SocialLink href={mockContactInfo.socials.twitter} icon={<Twitter size={20} />} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* The Location Section with the interactive map */}
      <LocationSection />
    </>
  );
};

// Helper sub-component for displaying a piece of contact information.
const ContactInfoItem = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="text-primary mt-1">{icon}</div>
    <div>
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      {href ? (
        <a href={href} className="text-gray-800 hover:text-primary transition-colors">{value}</a>
      ) : (
        <p className="text-gray-800">{value}</p>
      )}
    </div>
  </div>
);

// Helper sub-component for rendering a social media link icon.
const SocialLink = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
    {icon}
  </a>
);

export default ContactPage;