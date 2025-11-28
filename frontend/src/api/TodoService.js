const API_URL = 'https://todo-backend-eqln.onrender.com/api/todos';

// Helper function to get the token for authorized requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// --- READ (Get All Todos) ---
export const getTodos = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch todos.');
    }

    return data; // Array of todo objects
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// --- CREATE (Add New Todo) ---
export const createTodo = async (todoData) => {
  try {
    // todoData = { title, description }
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(todoData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create todo.');
    }

    return data; // The newly created todo
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// --- UPDATE (Toggle Completion/Edit) ---
export const updateTodo = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedFields),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update todo.');
    }

    return data; // Updated todo object
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// --- DELETE (Remove Todo) ---
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete todo.');
    }

    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
