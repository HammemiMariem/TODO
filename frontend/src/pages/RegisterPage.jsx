import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm'; // Import the UI form
import { registerUser } from '../api/AuthService'; // Import the API function
import { useAuth } from '../context/AuthContext'; // To check if user is already logged in
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation
    const { isAuthenticated } = useAuth();

    // If the user is ALREADY logged in, redirect them to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleRegisterSubmit = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Call the API service to register the user
            await registerUser(userData);
            
            // 2. On successful registration, redirect the user to the Login page
            alert("Registration successful! Please log in.");
            navigate('/login');

        } catch (err) {
            // 3. Handle errors (e.g., email already exists)
            setError(err.message || 'An unexpected error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegistrationForm 
            onSubmit={handleRegisterSubmit} 
            isLoading={isLoading} 
            errorMessage={error}
        />
    );
};

export default RegisterPage;