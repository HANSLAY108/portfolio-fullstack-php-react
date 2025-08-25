// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

// --- LAYOUTS & PAGES ---
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ProjectsPage from './pages/public/ProjectsPage';
import ServicesPage from './pages/public/ServicesPage';
import ContactPage from './pages/public/ContactPage';
import ProjectDetailPage from './pages/public/ProjectDetailPage';
import TestimonialSubmissionPage from './pages/public/TestimonialSubmissionPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminProjectFormPage from './pages/admin/AdminProjectFormPage'; // 1. Import the form page
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/submit-testimonial/:token" element={<TestimonialSubmissionPage />} />
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          
          {/* --- 2. ADD THE ROUTES FOR THE FORM --- */}
          <Route path="/admin/projects" element={<AdminProjectsPage />} />
          <Route path="/admin/projects/new" element={<AdminProjectFormPage />} />
          <Route path="/admin/projects/edit/:id" element={<AdminProjectFormPage />} />
          
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <SettingsProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </SettingsProvider>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;