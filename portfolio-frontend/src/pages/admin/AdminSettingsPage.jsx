import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSettings, updateLogo, updateTheme, updateContactDetails } from '../../api/settingsApi';
import { UploadCloud } from 'lucide-react';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [newLogoFile, setNewLogoFile] = useState(null);
  
  // 1. THE FIX: Initialize logoPreview with a safe default (empty string)
  const [logoPreview, setLogoPreview] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect fetches the initial data
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        setSettings(response.data);
        
        // 2. THE FIX: Set the logo preview ONLY AFTER data is fetched
        if (response.data && response.data.logo_url) {
          setLogoPreview(`http://localhost/portfolio/portfolio-backend${response.data.logo_url}`);
        }
      } catch (error) {
        toast.error("Failed to load settings.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // ... (rest of the handlers are the same)
    if (name.startsWith('socials.')) {
      const platform = name.split('.')[1];
      setSettings(prev => ({ ...prev, socials: { ...prev.socials, [platform]: value } }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveLogo = async () => {
    if (!newLogoFile) { toast.error("Please select a new logo."); return; }
    const formData = new FormData();
    formData.append('logo', newLogoFile);
    try {
      const response = await updateLogo(formData);
      toast.success('Logo updated successfully!');
      setLogoPreview(`http://localhost/portfolio/portfolio-backend${response.data.logo_url}`);
    } catch (error) { toast.error('Failed to update logo.'); }
  };
  
  const handleApplyTheme = async () => {
    try {
      await updateTheme(settings.accent_color);
      toast.success(`Theme color updated!`);
      // Manually update the CSS variable for instant feedback
      document.documentElement.style.setProperty('--color-primary', settings.accent_color);
    } catch (error) { toast.error('Failed to apply theme.'); }
  };

  const handleSaveContact = async () => {
    try {
      const contactData = { contactEmail: settings.contact_email, contactPhone: settings.contact_phone };
      await updateContactDetails(contactData);
      toast.success("Contact information updated!");
    } catch (error) { toast.error('Failed to save contact details.'); }
  };

  if (isLoading) return <p className="text-dark-text-secondary">Loading settings...</p>;
  if (!settings) return <p className="text-dark-text-secondary">Could not load settings.</p>;

  const availableColors = [
    { name: 'Violet', hex: '#8B5CF6' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Teal', hex: '#14B8A6' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-dark-text-primary">Settings</h1>
      <div className="space-y-6 max-w-4xl">
        <SettingsCard title="Site Logo" description="Update your portfolio website's main logo.">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              {logoPreview ? (
                <img src={logoPreview} alt="Current Logo" className="h-16 w-auto bg-gray-200 p-2 rounded-md" />
              ) : (
                <div className="h-16 w-32 bg-gray-200 p-2 rounded-md flex items-center justify-center text-sm text-gray-500">No Logo</div>
              )}
              <p className="text-xs text-center text-dark-text-secondary mt-1">Current Logo</p>
            </div>
            <div className="flex-grow w-full">
              <label htmlFor="logo-upload" className="block text-sm font-medium text-dark-text-secondary mb-1">Upload New Logo</label>
              <input id="logo-upload" type="file" onChange={handleLogoChange} accept="image/png, image/jpeg, image/svg+xml" className="w-full text-sm text-dark-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
              <p className="text-xs text-dark-text-secondary mt-1">PNG, JPG, or SVG up to 2MB</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSaveLogo} className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover">Save Logo</button>
          </div>
        </SettingsCard>

        <SettingsCard title="Theme Color" description="Choose an accent color for your portfolio website.">
          <label className="block text-sm font-medium text-dark-text-secondary mb-2">Select Accent Color</label>
          <div className="flex items-center gap-4">
            {availableColors.map(color => (
              <label key={color.hex} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accent_color"
                  value={color.hex}
                  checked={settings.accent_color === color.hex}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-primary"
                />
                <span style={{ backgroundColor: color.hex }} className="h-8 w-8 rounded-full border-2 border-dark-border"></span>
              </label>
            ))}
          </div>
           <div className="flex justify-end mt-4">
            <button onClick={handleApplyTheme} className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover">Apply Theme</button>
          </div>
        </SettingsCard>

        <SettingsCard title="Contact Information" description="Update your public contact details.">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-text-secondary mb-1">Email Address</label>
              <input type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text-secondary mb-1">Phone Number</label>
              <input type="tel" name="contact_phone" value={settings.contact_phone || ''} onChange={handleInputChange} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-dark-text-primary" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSaveContact} className="bg-primary text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-primary-hover">Save Contact Details</button>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

const SettingsCard = ({ title, description, children }) => (
  <div className="bg-dark-card border border-dark-border rounded-lg p-6">
    <h2 className="text-xl font-semibold text-dark-text-primary">{title}</h2>
    <p className="text-sm text-dark-text-secondary mt-1 mb-6">{description}</p>
    {children}
  </div>
);

export default AdminSettingsPage;