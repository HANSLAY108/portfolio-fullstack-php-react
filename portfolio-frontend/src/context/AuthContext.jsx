// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. We will use axios for API calls
import { API_BASE_URL } from '../config'; // 2. Import our API URL

const AuthContext = createContext(null);

// 3. CRUCIAL: Configure axios to send cookies with every request.
// This is required for PHP's session-based authentication to work.
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents flicker on page load
  const navigate = useNavigate();

  // This effect runs once to check if a session already exists on the backend
  useEffect(() => {
    const checkSession = async () => {
      try {
        // We will create this 'check_session.php' endpoint next.
        // It simply checks the PHP session and returns user data if logged in.
        const response = await axios.get(`${API_BASE_URL}/auth.php?action=check_session`);
        if (response.data.isLoggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        // This is expected if there is no session.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const isAuthenticated = !!user;

  // 4. THE UPDATED LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth.php`, {
        email: email,
        password: password
      });

      if (response.status === 200 && response.data.user) {
        const userData = response.data.user;
        setUser(userData);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      // This will catch the 401 Unauthorized error from our PHP script
      console.error("Login failed:", error.response?.data?.message || "An error occurred");
      // Re-throw the error so the LoginPage can catch it and display a toast notification
      throw new Error(error.response?.data?.message || 'Login Failed');
    }
  };

  // 5. THE UPDATED LOGOUT FUNCTION
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth.php?action=logout`);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      navigate('/admin/login');
    }
  };

  const value = { user, isAuthenticated, login, logout, loading };

  // Don't render the rest of the app until the session check is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);