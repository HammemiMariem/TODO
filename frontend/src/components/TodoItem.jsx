import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  const handleToggle = () => {
    onToggleComplete(todo._id, !todo.completed);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onDelete(todo._id);
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          style={{ marginRight: '10px', transform: 'scale(1.2)' }}
        />
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#888' : '#333',
          }}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={handleDelete}
        style={{
          background: 'none',
          border: '1px solid red',
          color: 'red',
          padding: '5px 10px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
