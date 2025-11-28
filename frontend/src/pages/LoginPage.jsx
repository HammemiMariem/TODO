// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm'; // Import the UI form
import { useAuth } from '../context/AuthContext'; // Import the global state hook
import { loginUser } from '../api/AuthService'; // Import the API function

const LoginPage = () => {
    // State for tracking loading status and errors
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get the login function and current auth status from context
    const { login, isAuthenticated } = useAuth();

    // If the user is ALREADY logged in, redirect them to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleLoginSubmit = async ({ email, password }) => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Call the API service to get the token and user data
            const { token } = await loginUser({ email, password });
            
            // 2. Update the global state and localStorage
            login(token); 
            
        } catch (err) {
            // 3. Handle errors (e.g., incorrect password)
            setError(err.message || 'An unexpected error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginForm 
            onSubmit={handleLoginSubmit} 
            isLoading={isLoading} 
            errorMessage={error}
        />
    );
};

export default LoginPage;