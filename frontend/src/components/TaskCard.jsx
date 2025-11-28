import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.progress !== 'completed';

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'not started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
        isOverdue ? 'border-red-500' : 'border-gray-200'
      } hover:shadow-lg transition-shadow ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-lg font-semibold text-gray-900 ${task.completed ? 'line-through' : ''}`}>
              {task.title || 'Untitled Task'}
            </h3>
            {isOverdue && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                Overdue
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{task.description || 'No description'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
            task.priority || 'medium'
          )}`}
        >
          {task.priority ? task.priority.toUpperCase() : 'MEDIUM'}
        </span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getProgressColor(
            task.progress || 'not started'
          )}`}
        >
          {task.progress ? task.progress.replace(/\b\w/g, (l) => l.toUpperCase()) : 'Not Started'}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Deadline:</span>{' '}
          <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
            {formatDeadline(task.deadline)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={(e) => onToggleComplete(task._id, e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            {task.completed ? 'Completed' : 'Mark as completed'}
          </span>
        </label>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
