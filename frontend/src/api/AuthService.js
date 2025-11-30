const API_URL = 'https://todo-backend-eqln.onrender.com/api/auth';
/**
 * Sends a new user registration request to the backend.
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} The response data from the server.
 */
export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Throw an error if the server response is not in the 200 range
            throw new Error(data.message || 'Registration failed');
        }

        // Backend typically returns a success message or the user object
        return data; 
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

/**
 * Sends a login request to the backend.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<string>} The JWT token upon successful login.
 */
export const loginUser = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Throw an error if the server response is not in the 200 range
            throw new Error(data.message || 'Login failed');
        }

        // ASSUMPTION: Your backend returns the JWT in the 'token' field.
        const token = data.token; 
        
        if (!token) {
                throw new Error("Login successful, but no token received.");
        }

        // Return both token and user data
        return { token, user: { _id: data._id, username: data.username, email: data.email } }; 
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

/**
 * Fetches the current user's profile from the backend.
 * @returns {Promise<object>} The user profile data (username, email, address, picture).
 */
export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Get response text first to check if it's JSON
        const text = await response.text();
        
        // Check if response is JSON
        let data;
        try {
            data = JSON.parse(text);
        } catch (parseError) {
            // If parsing fails, it's likely HTML or plain text
            console.error('Failed to parse response as JSON:', text.substring(0, 200));
            if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
                throw new Error('Server returned an HTML page instead of JSON. The backend endpoint may not be configured correctly.');
            }
            throw new Error(`Server returned invalid response. Status: ${response.status}`);
        }

        if (!response.ok) {
            throw new Error(data.message || `Failed to fetch profile (Status: ${response.status})`);
        }

        return data;
    } catch (error) {
        console.error("Get profile error:", error);
        // Re-throw with a more user-friendly message if it's a JSON parse error
        if (error.message.includes('JSON') || error.message.includes('<!DOCTYPE') || error.message.includes('HTML')) {
            throw new Error('Unable to connect to server. Please check if the backend is running and the /api/auth/profile endpoint exists.');
        }
        throw error;
    }
};