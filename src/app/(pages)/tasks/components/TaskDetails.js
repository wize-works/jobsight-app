import React from 'react';
import Link from 'next/link';

const TaskDetails = ({ task }) => {
    if (!task) {
        return null;
    }

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

    const getPriorityColor = (priority) => {
        const priorityColors = {
            urgent: 'text-error',
            high: 'text-warning',
            normal: 'text-info',
            low: 'text-success'
        };

        return priorityColors[priority?.toLowerCase()] || 'text-base-content';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';

        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isPastDue = (dateString) => {
        if (!dateString || task.status === 'completed' || task.status === 'cancelled') {
            return false;
        }

        return new Date(dateString) < new Date();
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column - Task details */}
                    <div>
                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            {task.description ? (
                                <div className="bg-base-200 p-4 rounded-lg whitespace-pre-wrap">
                                    {task.description}
                                </div>
                            ) : (
                                <div className="bg-base-200 p-4 rounded-lg text-base-content/50 italic">
                                    No description provided
                                </div>
                            )}
                        </div>

                        {/* Attachments - if applicable */}
                        {task.attachments && task.attachments.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <ul className="space-y-2">
                                        {task.attachments.map((attachment, index) => (
                                            <li key={index} className="flex items-center">
                                                <i className="fas fa-paperclip mr-2"></i>
                                                <a href={attachment.url} className="link link-primary" target="_blank" rel="noreferrer">
                                                    {attachment.filename}
                                                </a>
                                                <span className="text-xs text-base-content/60 ml-2">
                                                    ({attachment.size})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Subtasks - if applicable */}
                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Subtasks</h3>
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <ul className="space-y-2">
                                        {task.subtasks.map((subtask, index) => (
                                            <li key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm mr-2"
                                                    checked={subtask.completed}
                                                    readOnly
                                                />
                                                <span className={subtask.completed ? 'line-through text-base-content/60' : ''}>
                                                    {subtask.title}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right column - Task metadata */}
                    <div>
                        <div className="bg-base-200 rounded-lg p-4">
                            <ul className="space-y-4">
                                {/* Status */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Status:</span>
                                    <div className={`py-1 px-4 rounded-full border ${getStatusColor(task.status)}`}>
                                        {task.status === 'in_progress' ? 'In Progress' :
                                            task.status?.charAt(0).toUpperCase() + task.status?.slice(1).toLowerCase()}
                                    </div>
                                </li>

                                {/* Priority */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Priority:</span>
                                    <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                                        {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase() : 'Not set'}
                                    </span>
                                </li>

                                {/* Assigned To */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Assigned To:</span>
                                    {task.assignedToId ? (
                                        <div className="flex items-center">
                                            <div className="avatar placeholder mr-2">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
                                                    <span>{task.assignedToName?.charAt(0) || '?'}</span>
                                                </div>
                                            </div>
                                            <span>{task.assignedToName}</span>
                                        </div>
                                    ) : (
                                        <span className="text-base-content/60 italic">Unassigned</span>
                                    )}
                                </li>

                                {/* Project */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Project:</span>
                                    {task.projectId ? (
                                        <Link href={`/projects/${task.projectId}`} className="link link-hover">
                                            {task.projectName}
                                        </Link>
                                    ) : (
                                        <span className="text-base-content/60 italic">Not assigned to a project</span>
                                    )}
                                </li>

                                {/* Due Date */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Due Date:</span>
                                    {task.dueDate ? (
                                        <span className={isPastDue(task.dueDate) ? 'text-error font-medium' : ''}>
                                            {isPastDue(task.dueDate) && (
                                                <i className="fas fa-exclamation-circle mr-1"></i>
                                            )}
                                            {formatDate(task.dueDate)}
                                        </span>
                                    ) : (
                                        <span className="text-base-content/60 italic">No due date</span>
                                    )}
                                </li>

                                {/* Created By */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Created By:</span>
                                    <span>{task.createdByName || 'Unknown'}</span>
                                </li>

                                {/* Created At */}
                                <li className="flex justify-between items-center">
                                    <span className="text-base-content/60">Created On:</span>
                                    <span>{formatDate(task.createdAt)}</span>
                                </li>

                                {/* Last Updated */}
                                {task.updatedAt && (
                                    <li className="flex justify-between items-center">
                                        <span className="text-base-content/60">Last Updated:</span>
                                        <span>{formatDate(task.updatedAt)}</span>
                                    </li>
                                )}

                                {/* Estimated Hours */}
                                {task.estimatedHours && (
                                    <li className="flex justify-between items-center">
                                        <span className="text-base-content/60">Estimated Hours:</span>
                                        <span>{task.estimatedHours}</span>
                                    </li>
                                )}

                                {/* Actual Hours */}
                                {task.actualHours && (
                                    <li className="flex justify-between items-center">
                                        <span className="text-base-content/60">Actual Hours:</span>
                                        <span>{task.actualHours}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;