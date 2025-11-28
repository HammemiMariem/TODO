import React, { useState, useEffect, useCallback } from 'react';
import { getTodos, deleteTodo, updateTodo, createTodo } from '../api/TodoService';
import { useAuth } from '../context/AuthContext';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import NavBar from '../components/NavBar';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Fetch Todos Error:', err);
      setError('Failed to load todos. You might need to log in again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

 const handleAddTodo = async (todoData) => {
  try {
    const newTodo = await createTodo(todoData);
    setTodos((prev) => [...prev, newTodo]);
  } catch (err) {
    setError('Failed to add todo.');
  }
};


  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
    }
  };

  const handleToggleComplete = async (id, completed) => {
    setTodos((prev) =>
      prev.map((todo) => (todo._id === id ? { ...todo, completed } : todo))
    );

    try {
      await updateTodo(id, { completed });
    } catch (err) {
      setError('Failed to update todo status.');
      fetchTodos();
    }
  };

  if (loading) return <div>Loading your tasks...</div>;

  return (
    <div className="todo-page-container">
      <NavBar />
      <h1>My Todo List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <AddTodoForm onSubmit={handleAddTodo} />

      {todos.length === 0 ? (
        <p>You have no tasks! Time to relax or add a new one.</p>
      ) : (
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default TodoListPage;
