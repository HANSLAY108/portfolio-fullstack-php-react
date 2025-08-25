// src/pages/admin/AdminProjectFormPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProjectById, addProject, updateProject } from '../../api/projectsApi';
import { UploadCloud, Link as LinkIcon, Github, Plus, X } from 'lucide-react';

const generateSlug = (title) => {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

const AdminProjectFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', tags: '', live_url: '', github_url: '' });
  const [keyFeatures, setKeyFeatures] = useState(['']);
  const [isFeatured, setIsFeatured] = useState(false);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(isEditing);

  const fetchProjectForEditing = useCallback(async () => {
    if (!isEditing) { setIsLoading(false); return; }
    try {
      const projectToEdit = await getProjectById(id);
      if (projectToEdit) {
        setFormData({
          title: projectToEdit.title || '', slug: projectToEdit.slug || '',
          description: projectToEdit.description || '',
          tags: Array.isArray(projectToEdit.tags) ? projectToEdit.tags.join(', ') : '',
          live_url: projectToEdit.live_url || '', github_url: projectToEdit.github_url || '',
        });
        setIsFeatured(projectToEdit.is_featured || false);
        setKeyFeatures(Array.isArray(projectToEdit.key_features) && projectToEdit.key_features.length > 0 ? projectToEdit.key_features : ['']);
        if (projectToEdit.image_url) {
          setMainImagePreview(`http://localhost/portfolio/portfolio-backend${projectToEdit.image_url}`);
        }
      } else { toast.error("Project not found."); navigate('/admin/projects'); }
    } catch (error) { toast.error("Failed to fetch project details."); } 
    finally { setIsLoading(false); }
  }, [id, isEditing, navigate]);

  useEffect(() => { fetchProjectForEditing(); }, [fetchProjectForEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value, ...(name === 'title' && !isEditing && { slug: generateSlug(value) })}));
  };
  const handleKeyFeatureChange = (index, value) => { const newFeatures = [...keyFeatures]; newFeatures[index] = value; setKeyFeatures(newFeatures); };
  const addKeyFeature = () => setKeyFeatures([...keyFeatures, '']);
  const removeKeyFeature = (index) => setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setMainImageFile(file); setMainImagePreview(URL.createObjectURL(file)); }
  };
  const handleScreenshotsChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setScreenshotFiles(prev => [...prev, ...newFiles]);
    setScreenshotPreviews(prev => [...prev, ...newFiles.map(f => URL.createObjectURL(f))]);
  };
  const removeScreenshot = (indexToRemove) => {
    setScreenshotFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setScreenshotPreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
    submissionData.append('is_featured', isFeatured);
    submissionData.append('key_features', JSON.stringify(keyFeatures.filter(f => f.trim() !== '')));
    if (mainImageFile) { submissionData.append('image', mainImageFile); }
    if (isEditing && mainImagePreview && !mainImageFile) {
      const originalPath = mainImagePreview.replace('http://localhost/portfolio/portfolio-backend', '');
      submissionData.append('current_image_url', originalPath);
    }
    screenshotFiles.forEach(file => { submissionData.append('screenshots[]', file); });
    
    try {
      if (isEditing) {
        await updateProject(id, submissionData);
        toast.success('Project updated successfully!');
      } else {
        await addProject(submissionData);
        toast.success('Project added successfully!');
      }
      navigate('/admin/projects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project.');
      setIsLoading(false);
    }
  };

  if (isLoading) { return <p className="text-dark-text-secondary p-4">Loading project form...</p>; }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark-text-primary">{isEditing ? 'Edit Project' : 'Add New Project'}</h1>
          <p className="text-sm text-dark-text-secondary mt-1">Fill in the details below to {isEditing ? 'update this project' : 'create a new project entry'} in your CMS.</p>
        </div>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-6">
        <div><label className="text-sm font-medium text-dark-text-primary">Project Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2" required /></div>
        <div><label className="text-sm font-medium text-dark-text-primary">URL Slug</label><input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2" required /></div>
        <div><label className="text-sm font-medium text-dark-text-primary">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2" required /></div>
        <div><label className="text-sm font-medium text-dark-text-primary">Tech Stack (comma-separated)</label><input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="text-sm font-medium text-dark-text-primary">Live Link</label><div className="relative mt-1"><LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary" /><input type="url" name="live_url" value={formData.live_url} onChange={handleChange} className="w-full pl-9 p-2 bg-dark-bg border border-dark-border rounded-md" /></div></div>
            <div><label className="text-sm font-medium text-dark-text-primary">Repository Link</label><div className="relative mt-1"><Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary" /><input type="url" name="github_url" value={formData.github_url} onChange={handleChange} className="w-full pl-9 p-2 bg-dark-bg border border-dark-border rounded-md" /></div></div>
        </div>
        <div className="flex items-center gap-2 pt-2"><input type="checkbox" id="is_featured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded bg-dark-bg border-dark-border text-primary focus:ring-primary" /><label htmlFor="is_featured" className="text-sm font-medium text-dark-text-secondary">Mark as Featured</label></div>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-dark-text-primary mb-2">Featured Project Image</h3>
        <p className="text-sm text-dark-text-secondary mb-4">Upload a main image to represent your project. This will be the primary visual.</p>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark-border border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {mainImagePreview ? <img src={mainImagePreview} alt="Preview" className="mx-auto h-40 w-auto object-cover rounded-md"/> : <UploadCloud className="mx-auto h-12 w-12 text-dark-text-secondary" />}
              <div className="flex text-sm text-dark-text-secondary justify-center"><label htmlFor="main-image-upload" className="relative cursor-pointer bg-dark-bg rounded-md font-medium text-primary p-1"><span>Upload an image</span><input id="main-image-upload" type="file" className="sr-only" onChange={handleMainImageChange} accept="image/*" /></label></div>
            </div>
          </div>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-dark-text-primary mb-2">Project Media Gallery</h3>
        <p className="text-sm text-dark-text-secondary mb-4">Add additional images to showcase your project in detail.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {screenshotPreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img src={preview} alt={`Screenshot ${index+1}`} className="h-32 w-full object-cover rounded-md" />
              <button type="button" onClick={() => removeScreenshot(index)} className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
            </div>
          ))}
          <label htmlFor="screenshots-upload" className="cursor-pointer flex flex-col items-center justify-center h-32 w-full border-2 border-dark-border border-dashed rounded-md text-dark-text-secondary hover:bg-dark-bg">
            <Plus size={24} />
            <span className="text-sm mt-1">Add More</span>
          </label>
          <input id="screenshots-upload" type="file" multiple className="sr-only" onChange={handleScreenshotsChange} accept="image/*"/>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => navigate('/admin/projects')} className="bg-dark-card border border-dark-border text-dark-text-secondary font-semibold px-6 py-2 rounded-md hover:border-gray-600">Cancel</button>
        <button type="submit" disabled={isLoading} className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-primary-hover disabled:bg-primary/50">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};
export default AdminProjectFormPage;