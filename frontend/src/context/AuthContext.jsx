import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
// 1. Create the Context object
const AuthContext = createContext();

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Custom Hook to easily consume the context
export const useAuth = () => {
    return useContext(AuthContext);
};

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    // State to hold the authentication token
    const [token, setToken] = useState(getToken());
    // State to track loading status (useful for initial check)
    const [loading, setLoading] = useState(true);

    // 3. useEffect to initialize and update state based on token changes
    useEffect(() => {
        // This runs once on mount to check for an existing token
        if (getToken()) {
            setToken(getToken());
        }
        setLoading(false); // Finished initial check
    }, []);

    // 4. Login Function
    const login = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken); // Store the JWT
            setToken(newToken); // Update state
        }
    };

    // 5. Logout Function
    const logout = () => {
        localStorage.removeItem('token'); // Remove the JWT
        setToken(null); // Clear state immediately
        
    };

    // 6. Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        // isAuthenticated is derived from the presence of a token
        isAuthenticated: !!token, 
        token,
        login,
        logout,
        loading,
    }), [token, loading]); // Dependencies for useMemo

    // 7. Render logic
    // You might want to show a loading spinner if the initial token check is slow
    if (loading) {
        // Return null or a simple loading message/spinner
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};