// src/pages/public/TestimonialSubmissionPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateTestimonialToken, submitTestimonial } from '../../api/testimonialsApi';
import { CheckCircle, AlertTriangle, Star } from 'lucide-react';

// Star Rating Sub-component
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={28}
          className={`cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

const TestimonialSubmissionPage = () => {
  const { token } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '', // For Client's Title/Company
    quote: '',
    rating: 5,
    project_reference: '',
  });
  
  const validateToken = useCallback(async () => {
    try {
      await validateTestimonialToken(token);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitTestimonial({ ...formData, token });
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Validating link...</div>;
  }
  if (!isValid) {
    return <div className="text-center py-20 px-4"><AlertTriangle size={48} className="mx-auto text-red-500 mb-4" /><h1 className="text-2xl font-bold text-red-600">Link Invalid or Expired</h1><p className="mt-2 text-gray-600">{errorMessage}</p></div>;
  }
  if (isSubmitted) {
    return <div className="text-center py-20 px-4"><CheckCircle size={48} className="mx-auto text-green-500 mb-4" /><h1 className="text-2xl font-bold text-green-600">Thank You!</h1><p className="mt-2 text-gray-600">Your testimonial has been submitted for review.</p></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-lg shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Share Your Experience</h1>
            <p className="mt-2 text-gray-600">I'd love to hear your feedback! Your testimonials help me improve and inspire others.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-gray-700">Your Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-md" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700">Your Title / Company</label><input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-md" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Your Testimonial</label><textarea name="quote" placeholder="Share your experience and how our service/product helped you..." value={formData.quote} onChange={handleChange} rows="5" required className="w-full mt-1 p-3 border border-gray-300 rounded-md" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Overall Rating</label><div className="mt-2"><StarRating rating={formData.rating} setRating={(r) => setFormData(p => ({...p, rating: r}))} /></div></div>
          <div><label className="block text-sm font-medium text-gray-700">Project or Service Reference (Optional)</label><input type="text" name="project_reference" placeholder="e.g., Website Redesign, Marketing Campaign" value={formData.project_reference} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-300 rounded-md" /></div>
          
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors">
            {isLoading ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialSubmissionPage;