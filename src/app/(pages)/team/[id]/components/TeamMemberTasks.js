import React from 'react';
import Link from 'next/link';

const TeamMemberTasks = ({ tasks = [], loading = false }) => {
    if (loading) {
        return (
            <div className="bg-base-100 rounded-lg shadow-md p-6">
                <div className="h-6 bg-base-300 rounded w-32 mb-4 animate-pulse"></div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-5 bg-base-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-base-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'text-error';
            case 'high': return 'text-warning';
            case 'normal': return 'text-info';
            case 'low': return 'text-success';
            default: return 'text-base-content/70';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'badge-error';
            case 'high': return 'badge-warning';
            case 'normal': return 'badge-info';
            case 'low': return 'badge-success';
            default: return 'badge-ghost';
        }
    };

    // Sort tasks: incomplete first, then by priority and due date
    const sortedTasks = [...tasks].sort((a, b) => {
        // Completed tasks at the bottom
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (a.status !== 'completed' && b.status === 'completed') return -1;

        // Priority order: urgent > high > normal > low
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        const aPriority = priorityOrder[a.priority?.toLowerCase()] ?? 999;
        const bPriority = priorityOrder[b.priority?.toLowerCase()] ?? 999;
        if (aPriority !== bPriority) return aPriority - bPriority;

        // Sort by due date if priorities are equal
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    const formatDueDate = (dateString) => {
        if (!dateString) return 'No due date';

        const dueDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const isToday = dueDate.getDate() === today.getDate() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getFullYear() === today.getFullYear();

        const isTomorrow = dueDate.getDate() === tomorrow.getDate() &&
            dueDate.getMonth() === tomorrow.getMonth() &&
            dueDate.getFullYear() === tomorrow.getFullYear();

        if (isToday) {
            return `Today, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (isTomorrow) {
            return `Tomorrow, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return dueDate.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const isOverdue = (dateString, status) => {
        if (status === 'completed') return false;
        if (!dateString) return false;

        const dueDate = new Date(dateString);
        const now = new Date();
        return dueDate < now;
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tasks ({tasks.length})</h2>
                {tasks.length > 0 && (
                    <span className="badge badge-outline badge-sm">
                        {tasks.filter(t => t.status !== 'completed').length} active
                    </span>
                )}
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                    <i className="fas fa-clipboard-check text-2xl mb-2"></i>
                    <p>No tasks assigned</p>
                </div>
            ) : (
                <div className="divide-y divide-base-200">
                    {sortedTasks.map((task) => (
                        <div
                            key={task._id}
                            className={`py-3 px-2 -mx-2 rounded-md ${task.status === 'completed' ? 'opacity-60' : 'hover:bg-base-200'} transition-colors`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-base-content/70' : ''}`}>
                                    {task.title}
                                </h3>
                                <span className={`badge badge-sm ${getPriorityBadgeClass(task.priority)}`}>
                                    {task.priority || 'None'}
                                </span>
                            </div>

                            {task.projectId && (
                                <div className="text-xs text-base-content/70 mb-2">
                                    <i className="fas fa-project-diagram mr-1"></i>
                                    <Link href={`/projects/${task.projectId}`} className="hover:text-primary">
                                        {task.projectName || task.projectId}
                                    </Link>
                                </div>
                            )}

                            <div className="flex justify-between text-xs mt-2">
                                <div className="flex flex-wrap gap-1 max-w-[70%]">
                                    {(task.tags || []).slice(0, 2).map((tag, index) => (
                                        <span key={index} className="badge badge-outline badge-sm">
                                            {tag}
                                        </span>
                                    ))}
                                    {(task.tags || []).length > 2 && (
                                        <span className="badge badge-sm">+{task.tags.length - 2}</span>
                                    )}
                                </div>

                                <span className={`${isOverdue(task.dueDate, task.status) ? 'text-error' : ''}`}>
                                    <i className={`fas fa-${isOverdue(task.dueDate, task.status) ? 'exclamation-circle' : 'clock'} mr-1`}></i>
                                    {formatDueDate(task.dueDate)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamMemberTasks;