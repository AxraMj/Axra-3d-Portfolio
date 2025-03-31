import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiFolder, FiMail, FiLogOut, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const BACKEND_URL = 'http://localhost:5000';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const [projectsRes, messagesRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/projects`, { headers }),
        fetch(`${BACKEND_URL}/api/contact`, { headers })
      ]);
      
      if (!projectsRes.ok || !messagesRes.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const [projectsData, messagesData] = await Promise.all([
        projectsRes.json(),
        messagesRes.json()
      ]);
      
      setProjects(projectsData);
      setMessages(messagesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete project');

      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <div className="w-64 bg-tertiary h-screen fixed left-0 top-0 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>
      <nav className="space-y-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-secondary'
          }`}
        >
          <FiHome className="text-white" />
          <span className="text-white">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-secondary'
          }`}
        >
          <FiFolder className="text-white" />
          <span className="text-white">Projects</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
            activeTab === 'messages' ? 'bg-blue-600' : 'hover:bg-secondary'
          }`}
        >
          <FiMail className="text-white" />
          <span className="text-white">Messages</span>
        </button>
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-600 transition-colors mt-auto absolute bottom-6 left-6 right-6"
      >
        <FiLogOut className="text-white" />
        <span className="text-white">Logout</span>
      </button>
    </div>
  );

  const ProjectCard = ({ project, onDelete }) => {
    const imageUrl = project.image.startsWith('http') 
      ? project.image 
      : `${BACKEND_URL}${project.image}`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tertiary rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `${BACKEND_URL}/placeholder.png`;
              console.error('Error loading image:', imageUrl);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <FiEdit2 className="text-white text-xl" />
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                <FiTrash2 className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.name}
                className={`px-3 py-1 rounded-full text-sm ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const MessageCard = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-tertiary rounded-lg shadow-xl p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{message.name}</h3>
          <p className="text-gray-400">{message.email}</p>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-300">{message.message}</p>
    </motion.div>
  );

  const DashboardOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-tertiary rounded-lg shadow-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Total Projects</h3>
        <p className="text-3xl font-bold text-blue-500">{projects.length}</p>
      </div>
      <div className="bg-tertiary rounded-lg shadow-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Total Messages</h3>
        <p className="text-3xl font-bold text-green-500">{messages.length}</p>
      </div>
      <div className="bg-tertiary rounded-lg shadow-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Latest Activity</h3>
        <p className="text-gray-400">
          {messages.length > 0 
            ? `Latest message from ${messages[0].name}`
            : 'No recent messages'}
        </p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'projects':
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Projects</h1>
                <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
              </div>
              <button
                onClick={() => navigate('/admin/projects/new')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus />
                <span>Add New Project</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        );
      case 'messages':
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Messages</h1>
              <p className="text-gray-400 mt-1">View and manage contact form submissions</p>
            </div>
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 