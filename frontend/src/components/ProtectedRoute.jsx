import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your custom hook

const ProtectedRoute = () => {
    // 1. Get the current auth state from the context
    const { isAuthenticated, loading } = useAuth();

    // 2. Wait until the initial check is complete
    if (loading) {
        // You can return a spinner or loading page here 
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user session...</p>
                </div>
            </div>
        );
    }

    // 3. Core protection logic
    if (!isAuthenticated) {
        // If the user is NOT authenticated, redirect them to the login page.
        // 'replace' ensures the login page replaces the history entry.
        return <Navigate to="/login" replace />;
    }

    // 4. If the user IS authenticated, render the child route component.
    // The <Outlet /> component is provided by React Router and renders the 
    // nested route component (e.g., TodoListPage) defined in App.jsx.
    return <Outlet />;
};

export default ProtectedRoute;