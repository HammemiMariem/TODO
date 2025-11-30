import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api/AuthService';
import Navbar from '../components/Navbar';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  // Reset image error states when profile changes
  useEffect(() => {
    setImageError(false);
    setFallbackError(false);
  }, [profile]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="text-red-600 text-center">
              <p className="font-semibold">Error loading profile</p>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-white/50">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
          
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              {profile?.picture && !fallbackError ? (
                !imageError ? (
                  <img
                    src={profile.picture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.username || 'User')}&background=6366f1&color=fff&size=128`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                    onError={() => {
                      setFallbackError(true);
                    }}
                  />
                )
              ) : (
                <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-indigo-200 shadow-lg">
                  {profile?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-lg font-semibold text-gray-900">{profile?.username || 'N/A'}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-lg text-gray-900">{profile?.email || 'N/A'}</p>
              </div>

              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-lg text-gray-900">{profile?.address || 'No address provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

