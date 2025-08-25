import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { generateTestimonialLink, getAllTestimonials, updateTestimonialStatus } from '../../api/testimonialsApi';
import { Link as LinkIcon, Copy, Check, X, Upload } from 'lucide-react';
import clientAvatar from '../../assets/client1.png'; // Placeholder avatar

const AdminTestimonialsPage = () => {
  const [generatedLink, setGeneratedLink] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // State for the generate button

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch testimonials.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // --- THIS IS THE RESTORED FUNCTIONALITY ---
  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      const response = await generateTestimonialLink();
      if (response.success && response.link) {
        setGeneratedLink(response.link);
        toast.success("New testimonial link generated!");
      } else {
        toast.error(response.message || "Failed to generate link.");
      }
    } catch (error) {
      toast.error("An error occurred while generating the link.");
      console.error("Generate link error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      toast.success("Link copied to clipboard!");
    }
  };
  // ------------------------------------------

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateTestimonialStatus(id, status);
      toast.success(`Testimonial has been ${status.toLowerCase()}!`);
      // Refresh the list to show the new status
      fetchTestimonials();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-dark-text-primary">Testimonial Management</h1>
      <p className="text-sm text-dark-text-secondary -mt-6">Manage testimonial requests and published content.</p>

      {/* Generate Link Card */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary">Testimonial Request Link</h2>
        <p className="text-sm text-dark-text-secondary mt-1 mb-4">Create and share a link for others to submit testimonials.</p>
        <div>
          <label className="text-sm font-medium text-dark-text-secondary">Custom Message (Optional)</label>
          <textarea placeholder="e.g., 'Share your experience with my services!'" rows="2" className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2" />
        </div>
        <button 
          onClick={handleGenerateLink}
          disabled={isGenerating} // Button is disabled while generating
          className="mt-4 flex items-center gap-2 bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover disabled:bg-primary/50"
        >
          <LinkIcon size={16} />
          {isGenerating ? 'Generating...' : 'Generate New Link'}
        </button>
        {generatedLink && (
          <div className="mt-4 p-3 bg-dark-bg border border-dark-border rounded-md flex items-center justify-between">
            <span className="text-sm text-green-400 truncate">{generatedLink}</span>
            <button onClick={copyToClipboard} className="ml-4 text-dark-text-secondary hover:text-white flex-shrink-0" title="Copy link">
              <Copy size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Submitted Testimonials List */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-text-primary">Submitted Testimonials</h2>
        <p className="text-sm text-dark-text-secondary mt-1 mb-6">Review, approve, and upload testimonials to your home page.</p>
        <div className="space-y-4">
          {isLoading ? <p>Loading testimonials...</p> : testimonials.map(item => (
            <TestimonialCard key={item.id} testimonial={item} onStatusUpdate={handleStatusUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Helper Sub-component for the testimonial card (Unchanged) ---
const TestimonialCard = ({ testimonial, onStatusUpdate }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Approved': return { text: 'Approved', color: 'text-green-400 bg-green-500/10' };
      case 'Rejected': return { text: 'Rejected', color: 'text-red-400 bg-red-500/10' };
      default: return { text: 'Pending', color: 'text-yellow-400 bg-yellow-500/10' };
    }
  };
  const statusInfo = getStatusInfo(testimonial.status);

  return (
    <div className="bg-dark-bg border border-dark-border rounded-lg p-4 flex flex-col sm:flex-row items-start gap-4">
      <img src={clientAvatar} alt={testimonial.name} className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-dark-text-primary">{testimonial.name}</h4>
            <p className="text-sm text-dark-text-secondary">{testimonial.title}</p>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusInfo.color}`}>{statusInfo.text}</span>
        </div>
        <p className="text-sm text-dark-text-secondary mt-2">{testimonial.quote}</p>
        <div className="flex gap-2 mt-4">
          {testimonial.status === 'Pending' && (
            <>
              <button onClick={() => onStatusUpdate(testimonial.id, 'Approved')} className="text-sm font-semibold bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md">Approve</button>
              <button onClick={() => onStatusUpdate(testimonial.id, 'Rejected')} className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md">Reject</button>
            </>
          )}
          {testimonial.status === 'Approved' && (
            <button className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-1"><Upload size={14}/> Upload to Home</button>
          )}
          {testimonial.status === 'Rejected' && (
            <button onClick={() => onStatusUpdate(testimonial.id, 'Pending')} className="text-sm font-semibold border border-dark-border hover:bg-gray-700 px-3 py-1 rounded-md">Re-approve</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;