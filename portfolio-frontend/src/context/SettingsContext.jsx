// src/context/SettingsContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSettings } from '../api/settingsApi';

// 1. Create a default "skeleton" state to prevent errors
const initialSettingsState = {
  site_title: 'Toh Hanslay',
  logo_url: null,
  accent_color: '#8B5CF6', // Default purple
  contact_email: '',
  contact_phone: '',
};

const SettingsContext = createContext(initialSettingsState);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettingsState);
  const [loading, setLoading] = useState(true); // 2. Add a loading state

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        if (response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch site settings, using defaults.", error);
        // On error, we will just use the initial default state
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Inject the accent color as a CSS variable on the root element
  useEffect(() => {
    if (settings?.accent_color) {
      document.documentElement.style.setProperty('--color-primary', settings.accent_color);
    }
  }, [settings]);

  // 3. THE CRITICAL FIX: Do not render the children until settings have loaded.
  return (
    <SettingsContext.Provider value={settings}>
      {!loading && children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);