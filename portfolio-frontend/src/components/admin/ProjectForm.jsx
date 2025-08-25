// src/components/admin/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import { UploadCloud, Plus, X } from 'lucide-react';

const generateSlug = (title) => {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', tags: '', live_url: '', github_url: '' });
  const [keyFeatures, setKeyFeatures] = useState(['']);
  const [isFeatured, setIsFeatured] = useState(false);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '', slug: project.slug || '', description: project.description || '',
        tags: Array.isArray(project.tags) ? project.tags.join(', ') : '', live_url: project.live_url || '', github_url: project.github_url || '',
      });
      setKeyFeatures(Array.isArray(project.key_features) && project.key_features.length > 0 ? project.key_features : ['']);
      setIsFeatured(project.is_featured || false);
      if (project.image_url) {
        setMainImagePreview(`http://localhost/portfolio/portfolio-backend${project.image_url}`);
      }
    } else {
      // Reset form
      setFormData({ title: '', slug: '', description: '', tags: '', live_url: '', github_url: '' });
      setKeyFeatures(['']); setIsFeatured(false); setMainImageFile(null); setMainImagePreview(null);
      setScreenshotFiles([]); setScreenshotPreviews([]);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      if (name === 'title' && !project) { // Only auto-slug for new projects
        newFormData.slug = generateSlug(value);
      }
      return newFormData;
    });
  };

  const handleKeyFeatureChange = (index, value) => {
    const newFeatures = [...keyFeatures]; newFeatures[index] = value; setKeyFeatures(newFeatures);
  };
  const addKeyFeature = () => setKeyFeatures([...keyFeatures, '']);
  const removeKeyFeature = (index) => setKeyFeatures(keyFeatures.filter((_, i) => i !== index));

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setMainImageFile(file); setMainImagePreview(URL.createObjectURL(file)); }
  };

  const handleScreenshotsChange = (e) => {
    const files = Array.from(e.target.files);
    setScreenshotFiles(files); setScreenshotPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
    submissionData.append('is_featured', isFeatured);
    submissionData.append('key_features', JSON.stringify(keyFeatures.filter(f => f)));
    if (mainImageFile) { submissionData.append('image', mainImageFile); }
    if (project && project.image_url) { submissionData.append('current_image_url', project.image_url); }
    screenshotFiles.forEach((file, index) => { submissionData.append(`screenshots[]`, file); });
    onSave(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left max-h-[80vh] overflow-y-auto p-2">
      {/* ... (Full JSX from previous responses) ... */}
    </form>
  );
};

export default ProjectForm;