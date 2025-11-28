import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/TodoService';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FiltersSidebar from '../components/FiltersSidebar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priority: 'all',
    progress: 'all',
    showCompleted: true,
    showActive: true,
    showOverdue: false,
    deadlineStart: '',
    deadlineEnd: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTasks(data);
    } catch (err) {
      console.error('Fetch Todos Error:', err);
      setError('Failed to load tasks. You might need to log in again.');
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, fetchTodos]);

  // Filter and search tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    // Progress filter
    if (filters.progress !== 'all') {
      filtered = filtered.filter((task) => task.progress === filters.progress);
    }

    // Status filters
    if (!filters.showCompleted && !filters.showActive) {
      filtered = [];
    } else if (!filters.showCompleted) {
      filtered = filtered.filter((task) => !task.completed && task.progress !== 'completed');
    } else if (!filters.showActive) {
      filtered = filtered.filter((task) => task.completed || task.progress === 'completed');
    }

    // Overdue filter
    if (filters.showOverdue) {
      const now = new Date();
      filtered = filtered.filter((task) => {
        if (!task.deadline) return false;
        const deadline = new Date(task.deadline);
        return deadline < now && task.progress !== 'completed';
      });
    }

    // Deadline range filter
    if (filters.deadlineStart) {
      const startDate = new Date(filters.deadlineStart);
      filtered = filtered.filter((task) => {
        if (!task.deadline) return false;
        return new Date(task.deadline) >= startDate;
      });
    }

    if (filters.deadlineEnd) {
      const endDate = new Date(filters.deadlineEnd);
      endDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter((task) => {
        if (!task.deadline) return false;
        return new Date(task.deadline) <= endDate;
      });
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filters]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    try {
      console.log('Dashboard received task data:', taskData);
      if (editingTask) {
        await updateTodo(editingTask._id, taskData);
      } else {
        const result = await createTodo(taskData);
        console.log('Task created successfully:', result);
      }
      setIsFormOpen(false);
      setEditingTask(null);
      fetchTodos();
    } catch (err) {
      console.error('Error in handleFormSubmit:', err);
      setError(`Failed to ${editingTask ? 'update' : 'create'} task: ${err.message}`);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      if (completed) {
        // When marking as completed, set both completed and progress
        await updateTodo(id, { completed: true, progress: 'completed' });
      } else {
        // When unmarking as completed, only send completed: false
        // The backend will preserve 'in progress' state when unmarking
        // (it only resets to 'not started' if the task was 'completed')
        await updateTodo(id, { completed: false });
      }
      fetchTodos();
    } catch (err) {
      setError('Failed to update task status.');
      console.error(err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <Navbar />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Tasks
              </h1>
              <p className="text-gray-600 mt-1">Manage and organize your tasks efficiently</p>
            </div>
            <button
              onClick={handleCreateTask}
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 active:scale-95"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create Task
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-md">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-800 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-3">
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default Dashboard;
