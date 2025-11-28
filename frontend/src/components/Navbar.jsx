import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    console.log('Logout button clicked');
    
    try {
      // Clear token from localStorage immediately
      localStorage.removeItem('token');
      console.log('Token removed from localStorage');
      
      // Call logout to update context state
      logout();
      
      // Force navigation with a hard redirect to ensure clean state
      // Using replace prevents back button from going back to dashboard
      window.location.replace('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback: try direct navigation
      window.location.href = '/login';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Todo App
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;