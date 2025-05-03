import React from 'react';

const TaskHeader = ({ task, className = '' }) => {
    // Format the due date with time
    const formatDueDate = (dateString) => {
        if (!dateString) return null;

        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Check if the date is in the past
        const isPastDue = date < new Date() && task.status !== 'completed';

        return {
            formatted: formattedDate,
            isPastDue
        };
    };

    // Helper for status styling
    const getStatusColor = (status) => {
        const statusColors = {
            pending: 'bg-info text-info-content',
            in_progress: 'bg-primary text-primary-content',
            completed: 'bg-success text-success-content',
            cancelled: 'bg-error text-error-content',
            on_hold: 'bg-warning text-warning-content'
        };

        return statusColors[status?.toLowerCase()] || 'bg-base-300 text-base-content';
    };

    // Helper for priority styling
    const getPriorityColor = (priority) => {
        const priorityColors = {
            urgent: 'border-error text-error',
            high: 'border-warning text-warning',
            normal: 'border-info text-info',
            low: 'border-success text-success'
        };

        return priorityColors[priority?.toLowerCase()] || 'border-base-content/30 text-base-content/70';
    };

    const dueDate = formatDueDate(task.dueDate);

    return (
        <div className={`bg-base-100 p-6 rounded-lg shadow-md ${className}`}>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">{task.title}</h2>
                    {task.projectName && (
                        <div className="mt-1 text-base-content/70 flex items-center">
                            <i className="fas fa-folder mr-2"></i>
                            <span>{task.projectName}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Priority badge */}
                    {task.priority && (
                        <div className={`flex items-center border-2 px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            <i className="fas fa-flag mr-2"></i>
                            <span>{task.priority}</span>
                        </div>
                    )}

                    {/* Status badge */}
                    <div className={`px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status === 'in_progress' ? 'In Progress' :
                            task.status?.charAt(0).toUpperCase() + task.status?.slice(1).toLowerCase()}
                    </div>
                </div>
            </div>

            {/* Due date with past due warning if applicable */}
            {dueDate && (
                <div className={`mt-4 flex items-center ${dueDate.isPastDue ? 'text-error' : 'text-base-content/70'}`}>
                    <i className={`${dueDate.isPastDue ? 'fas fa-exclamation-circle' : 'fas fa-calendar-alt'} mr-2`}></i>
                    <span>
                        {dueDate.isPastDue ? 'Past due: ' : 'Due: '}
                        {dueDate.formatted}
                    </span>
                </div>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                        <div key={index} className="badge badge-outline">{tag}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskHeader;