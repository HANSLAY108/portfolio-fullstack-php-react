import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * LoginPage Component
 * 
 * Renders the administrator login form. It handles user input,
 * submission state, and displays feedback on login success or failure.
 */
const LoginPage = () => {
  // State for the email and password input fields.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State to manage the loading/disabled status of the submit button.
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the login function from our global authentication context.
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   * @param {React.FormEvent} e The form event.
   */
 
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await login(email, password);
        // Redirection is handled by the login function
    } catch (error) {
        // This will now display "Invalid credentials." from our PHP API
        toast.error(error.message || "Invalid credentials.");
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="mt-2 text-gray-500">Sign in to your admin dashboard to manage your portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="#" className="text-sm text-primary hover:underline">Forgot Password?</Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-hover transition-all duration-300 shadow-lg disabled:bg-primary/70 disabled:cursor-not-allowed"
            >
              <LogIn size={18} />
              <span>{isLoading ? 'Logging In...' : 'Login to Dashboard'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;