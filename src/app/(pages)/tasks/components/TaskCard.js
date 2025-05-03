import React from 'react';

const TaskCard = ({
    task,
    onClick = () => { },
    onMarkComplete = () => { }
}) => {
    const formatDueDate = (dateString) => {
        if (!dateString) return 'No due date';

        const dueDate = new Date(dateString);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // If it's today
        if (
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getDate() === today.getDate()
        ) {
            return `Today, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // If it's tomorrow
        if (
            dueDate.getFullYear() === tomorrow.getFullYear() &&
            dueDate.getMonth() === tomorrow.getMonth() &&
            dueDate.getDate() === tomorrow.getDate()
        ) {
            return `Tomorrow, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // If it's in the past
        if (dueDate < today) {
            return `Overdue: ${dueDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // Otherwise, show full date
        return `${dueDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const getPriorityBadge = (priority) => {
        if (!priority) return null;

        const priorityClasses = {
            urgent: 'bg-error/20 text-error border-error',
            high: 'bg-warning/20 text-warning border-warning',
            normal: 'bg-info/20 text-info border-info',
            low: 'bg-success/20 text-success border-success'
        };

        const classes = priorityClasses[priority.toLowerCase()] || 'bg-base-200 text-base-content/70 border-base-300';

        return (
            <div className={`text-xs border px-2 py-0.5 rounded-lg ${classes}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </div>
        );
    };

    const getStatusBadge = (status) => {
        if (!status) return null;

        const statusClasses = {
            pending: 'badge-info',
            in_progress: 'badge-primary',
            completed: 'badge-success',
            cancelled: 'badge-error',
            on_hold: 'badge-warning'
        };

        const badgeClass = statusClasses[status.toLowerCase()] || 'badge-neutral';

        return (
            <div className={`badge ${badgeClass} badge-sm`}>
                {status.replace('_', ' ')}
            </div>
        );
    };

    const handleTaskClick = (e) => {
        // Prevent the onClick from triggering when clicking the complete button
        e.stopPropagation();
        onClick();
    };

    const handleComplete = (e) => {
        e.stopPropagation();
        onMarkComplete();
    };

    const isCompleted = task.status?.toLowerCase() === 'completed';

    return (
        <div
            className={`border-b border-base-300 last:border-b-0 px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-base-200 transition-colors ${isCompleted ? 'bg-base-100/80' : 'bg-base-100'
                }`}
            onClick={handleTaskClick}
        >
            <div className="flex-shrink-0">
                {isCompleted ? (
                    <div className="h-6 w-6 bg-success/20 text-success rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-xs"></i>
                    </div>
                ) : (
                    <button
                        className="h-6 w-6 border-2 border-base-300 hover:border-primary rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={handleComplete}
                        aria-label="Mark task as complete"
                    ></button>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between gap-2">
                    <h3 className={`font-medium truncate ${isCompleted ? 'line-through text-base-content/60' : ''}`}>
                        {task.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-base-content/70">
                    {task.projectName && (
                        <div className="flex items-center">
                            <i className="fas fa-folder text-xs mr-1"></i>
                            <span className="truncate max-w-[120px] sm:max-w-[200px]">{task.projectName}</span>
                        </div>
                    )}

                    {task.assignedToName && (
                        <div className="flex items-center">
                            <i className="fas fa-user text-xs mr-1"></i>
                            <span className="truncate max-w-[120px] sm:max-w-[200px]">{task.assignedToName}</span>
                        </div>
                    )}

                    <div className="flex items-center">
                        <i className="fas fa-clock text-xs mr-1"></i>
                        <span className="truncate">{formatDueDate(task.dueDate)}</span>
                    </div>
                </div>

                {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-base-200 text-base-content/70 rounded-full px-2 py-0.5">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-shrink-0">
                <div className="text-base-content/50 hover:text-primary">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;