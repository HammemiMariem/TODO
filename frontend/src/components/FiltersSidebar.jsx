import React from 'react';

const FiltersSidebar = ({ filters, onFilterChange }) => {
  const {
    priority,
    progress,
    showCompleted,
    showActive,
    showOverdue,
    deadlineStart,
    deadlineEnd,
  } = filters;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-6 backdrop-blur-sm bg-opacity-95">
      {/* Header with icon */}
      <div className="flex items-center space-x-2 pb-4 border-b-2 border-indigo-100">
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Filters
        </h2>
      </div>

      {/* Priority Filter */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-100">
        <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
          <svg
            className="w-4 h-4 mr-2 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
          className="block w-full px-3 py-2.5 bg-white border-2 border-red-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all hover:border-red-300"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Progress Filter */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
        <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
          <svg
            className="w-4 h-4 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Progress
        </label>
        <select
          value={progress}
          onChange={(e) => onFilterChange('progress', e.target.value)}
          className="block w-full px-3 py-2.5 bg-white border-2 border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all hover:border-blue-300"
        >
          <option value="all">All Progress</option>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Status Filters */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
        <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
          <svg
            className="w-4 h-4 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Status
        </label>
        <div className="space-y-3">
          <label className="flex items-center group cursor-pointer">
            <input
              type="checkbox"
              checked={showActive}
              onChange={(e) => onFilterChange('showActive', e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded transition-all"
            />
            <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
              Active Tasks
            </span>
          </label>
          <label className="flex items-center group cursor-pointer">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => onFilterChange('showCompleted', e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded transition-all"
            />
            <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
              Completed Tasks
            </span>
          </label>
          <label className="flex items-center group cursor-pointer">
            <input
              type="checkbox"
              checked={showOverdue}
              onChange={(e) => onFilterChange('showOverdue', e.target.checked)}
              className="h-5 w-5 text-red-600 focus:ring-2 focus:ring-red-500 border-gray-300 rounded transition-all"
            />
            <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">
              Overdue Tasks
            </span>
          </label>
        </div>
      </div>

      {/* Deadline Range Filter */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
        <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
          <svg
            className="w-4 h-4 mr-2 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Deadline Range
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Start Date</label>
            <input
              type="date"
              value={deadlineStart}
              onChange={(e) => onFilterChange('deadlineStart', e.target.value)}
              className="block w-full px-3 py-2 bg-white border-2 border-purple-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all hover:border-purple-300"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">End Date</label>
            <input
              type="date"
              value={deadlineEnd}
              onChange={(e) => onFilterChange('deadlineEnd', e.target.value)}
              className="block w-full px-3 py-2 bg-white border-2 border-purple-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all hover:border-purple-300"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          onFilterChange('priority', 'all');
          onFilterChange('progress', 'all');
          onFilterChange('showActive', true);
          onFilterChange('showCompleted', true);
          onFilterChange('showOverdue', false);
          onFilterChange('deadlineStart', '');
          onFilterChange('deadlineEnd', '');
        }}
        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};

export default FiltersSidebar;
