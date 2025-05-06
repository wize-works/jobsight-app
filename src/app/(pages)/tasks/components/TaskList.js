import React from 'react';
import Link from 'next/link';

const TaskList = ({
    tasks = [],
    onTaskClick,
    onMarkComplete,
    loading = false,
    className = ''
}) => {
    const getStatusColor = (status) => {
        const statusColors = {
            pending: 'bg-info/10 border-info text-info',
            in_progress: 'bg-primary/10 border-primary text-primary',
            completed: 'bg-success/10 border-success text-success',
            cancelled: 'bg-error/10 border-error text-error',
            on_hold: 'bg-warning/10 border-warning text-warning'
        };

        return statusColors[status?.toLowerCase()] || 'bg-base-200 border-base-300';
    };

    const getPriorityIcon = (priority) => {
        const priorityIcons = {
            urgent: { icon: 'fa-exclamation-circle', color: 'text-error' },
            high: { icon: 'fa-arrow-circle-up', color: 'text-warning' },
            normal: { icon: 'fa-circle', color: 'text-info' },
            low: { icon: 'fa-arrow-circle-down', color: 'text-success' }
        };

        return priorityIcons[priority?.toLowerCase()] || { icon: 'fa-circle', color: 'text-base-content/30' };
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;

        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        }
    };

    const isPastDue = (dateString, status) => {
        if (!dateString || status === 'completed' || status === 'cancelled') {
            return false;
        }

        const dueDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return dueDate < today;
    };

    // Show loading state if loading prop is true
    if (loading) {
        return (
            <div className={`bg-base-100 rounded-lg shadow-md p-8 text-center ${className}`}>
                <span className="loading loading-spinner loading-lg text-base-content/50"></span>
                <p className="mt-4 text-base-content/60">Loading tasks...</p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className={`bg-base-100 rounded-lg shadow-md p-8 text-center ${className}`}>
                <div className="text-5xl text-base-content/20 mb-4">
                    <i className="fas fa-tasks"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                <p className="text-base-content/60 mb-6">There are no tasks matching your current filters</p>
                <Link href="/tasks/new" className="btn btn-primary">
                    <i className="fas fa-plus mr-2"></i>
                    Create New Task
                </Link>
            </div>
        );
    }

    return (
        <div className={`bg-base-100 rounded-lg shadow-md overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="w-6"></th>
                            <th>Task</th>
                            <th className="w-28">Due Date</th>
                            <th className="w-28">Status</th>
                            <th className="w-48">Assigned To</th>
                            <th className="w-28">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr
                                key={index}
                                className="hover:bg-base-200 cursor-pointer"
                                onClick={() => onTaskClick(task._id)}
                            >
                                {/* Priority indicator */}
                                <td className="p-0 pl-4">
                                    <div className="flex justify-center">
                                        {task.priority && (
                                            <i className={`fas ${getPriorityIcon(task.priority).icon} ${getPriorityIcon(task.priority).color}`}></i>
                                        )}
                                    </div>
                                </td>

                                {/* Task title and project */}
                                <td>
                                    <div>
                                        <div className="font-medium">{task.title}</div>
                                        {task.projectName && (
                                            <div className="text-sm text-base-content/60">
                                                <i className="fas fa-folder text-xs mr-1"></i> {task.projectName}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Due date */}
                                <td className={isPastDue(task.dueDate, task.status) ? 'text-error font-medium' : ''}>
                                    {task.dueDate ? (
                                        <div className="flex items-center">
                                            {isPastDue(task.dueDate, task.status) && (
                                                <i className="fas fa-exclamation-circle mr-1"></i>
                                            )}
                                            {formatDate(task.dueDate)}
                                        </div>
                                    ) : (
                                        <span className="text-base-content/40">No due date</span>
                                    )}
                                </td>

                                {/* Status */}
                                <td>
                                    <div className={`py-1 px-3 text-center text-sm rounded-full border ${getStatusColor(task.status)}`}>
                                        {task.status === 'in_progress' ? 'In Progress' :
                                            task.status?.charAt(0).toUpperCase() + task.status?.slice(1).toLowerCase()}
                                    </div>
                                </td>

                                {/* Assigned to */}
                                <td>
                                    {task.assignedToId ? (
                                        <div className="flex items-center">
                                            <div className="avatar placeholder mr-2">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                                    <span>{task.assignedToName?.charAt(0) || '?'}</span>
                                                </div>
                                            </div>
                                            <span className="truncate">{task.assignedToName}</span>
                                        </div>
                                    ) : (
                                        <span className="text-base-content/40">Unassigned</span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="flex gap-2 justify-center">
                                    <Link
                                        href={`/tasks/${task.id}`}
                                        className="btn btn-sm btn-ghost btn-square"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                    <Link
                                        href={`/tasks/${task.id}/edit`}
                                        className="btn btn-sm btn-ghost btn-square"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    {task.status !== 'completed' && onMarkComplete && (
                                        <button
                                            className="btn btn-sm btn-ghost btn-square text-success"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onMarkComplete({ id: task._id });
                                            }}
                                            title="Mark as completed"
                                        >
                                            <i className="fas fa-check"></i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default TaskList;