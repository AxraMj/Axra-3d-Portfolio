import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    source_code_link: '',
    tags: [{ name: '', color: 'blue-text-gradient' }]
  });

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (id) {
      fetchProject();
    }
  }, [id, token, navigate]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      setError('Failed to fetch project');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTagChange = (index, field, value) => {
    const newTags = [...formData.tags];
    newTags[index] = { ...newTags[index], [field]: value };
    setFormData({ ...formData, tags: newTags });
  };

  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, { name: '', color: 'blue-text-gradient' }]
    });
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = id
        ? `http://localhost:5000/api/projects/${id}`
        : 'http://localhost:5000/api/projects';
      
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save project');

      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-2xl mx-auto bg-tertiary rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {id ? 'Edit Project' : 'Add New Project'}
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="name">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="source_code_link">
              Source Code Link
            </label>
            <input
              type="url"
              id="source_code_link"
              name="source_code_link"
              value={formData.source_code_link}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Tags</label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tag.name}
                  onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                  placeholder="Tag name"
                  className="flex-1 px-3 py-2 rounded bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <select
                  value={tag.color}
                  onChange={(e) => handleTagChange(index, 'color', e.target.value)}
                  className="px-3 py-2 rounded bg-secondary text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="blue-text-gradient">Blue</option>
                  <option value="green-text-gradient">Green</option>
                  <option value="pink-text-gradient">Pink</option>
                </select>
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTag}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add Tag
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm; 