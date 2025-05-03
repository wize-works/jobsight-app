import React from 'react';

const TaskFilter = ({
    priority = 'all',
    setPriority = () => { },
    status = 'all',
    setStatus = () => { },
    searchTerm = '',
    setSearchTerm = () => { },
    sortBy = 'dueDate',
    sortOrder = 'asc',
    onToggleSort = () => { },
    viewMode = 'list',
    setViewMode = () => { },
    loading = false
}) => {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const priorities = [
        { value: 'all', label: 'All Priorities' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'high', label: 'High' },
        { value: 'normal', label: 'Normal' },
        { value: 'low', label: 'Low' }
    ];

    const statuses = [
        { value: 'all', label: 'All Statuses' },
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const getSortIcon = (field) => {
        if (sortBy !== field) return 'fa-sort';
        return sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-md p-4 mb-6">
            {/* Search bar */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-base-content/40"></i>
                </div>
                <input
                    type="text"
                    placeholder="Search tasks by title, description, project, assignee or tag..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    disabled={loading}
                />
                {searchTerm && (
                    <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setSearchTerm('')}
                        disabled={loading}
                    >
                        <i className="fas fa-times text-base-content/40 hover:text-base-content/70"></i>
                    </button>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
                {/* Filter dropdowns */}
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                    <div className="form-control w-full sm:max-w-[200px]">
                        <label className="label py-0">
                            <span className="label-text text-sm">Priority</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            disabled={loading}
                        >
                            {priorities.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full sm:max-w-[200px]">
                        <label className="label py-0">
                            <span className="label-text text-sm">Status</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            disabled={loading}
                        >
                            {statuses.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 items-end">
                    {/* Sort buttons */}
                    <div className="flex gap-2">
                        <button
                            className={`btn btn-sm btn-ghost ${sortBy === 'dueDate' ? 'text-primary' : ''}`}
                            onClick={() => onToggleSort('dueDate')}
                            disabled={loading}
                        >
                            Due Date <i className={`fas ${getSortIcon('dueDate')} ml-1`}></i>
                        </button>

                        <button
                            className={`btn btn-sm btn-ghost ${sortBy === 'priority' ? 'text-primary' : ''}`}
                            onClick={() => onToggleSort('priority')}
                            disabled={loading}
                        >
                            Priority <i className={`fas ${getSortIcon('priority')} ml-1`}></i>
                        </button>

                        <button
                            className={`btn btn-sm btn-ghost ${sortBy === 'title' ? 'text-primary' : ''}`}
                            onClick={() => onToggleSort('title')}
                            disabled={loading}
                        >
                            Title <i className={`fas ${getSortIcon('title')} ml-1`}></i>
                        </button>
                    </div>

                    {/* View mode toggle */}
                    <div className="btn-group self-end">
                        <button
                            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            disabled={loading}
                            aria-label="Grid view"
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                        <button
                            className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`}
                            onClick={() => setViewMode('list')}
                            disabled={loading}
                            aria-label="List view"
                        >
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Active filters display */}
            {(priority !== 'all' || status !== 'all' || searchTerm) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-base-200">
                    <span className="text-sm text-base-content/70">Active filters:</span>

                    {priority !== 'all' && (
                        <div className="badge badge-outline gap-1">
                            Priority: {priority}
                            <button
                                className="ml-1"
                                onClick={() => setPriority('all')}
                                disabled={loading}
                            >
                                <i className="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    )}

                    {status !== 'all' && (
                        <div className="badge badge-outline gap-1">
                            Status: {status.replace('_', ' ')}
                            <button
                                className="ml-1"
                                onClick={() => setStatus('all')}
                                disabled={loading}
                            >
                                <i className="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    )}

                    {searchTerm && (
                        <div className="badge badge-outline gap-1">
                            Search: {searchTerm}
                            <button
                                className="ml-1"
                                onClick={() => setSearchTerm('')}
                                disabled={loading}
                            >
                                <i className="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    )}

                    <button
                        className="text-sm text-primary hover:underline ml-auto"
                        onClick={() => {
                            setPriority('all');
                            setStatus('all');
                            setSearchTerm('');
                        }}
                        disabled={loading}
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskFilter;