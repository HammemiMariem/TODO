const API_URL = 'http://localhost:5000/api/auth';
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