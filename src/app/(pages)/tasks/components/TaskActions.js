import React, { useState } from 'react';

const TaskActions = ({
    task,
    onEdit = () => { },
    onDelete = () => { },
    onStatusChange = () => { }
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const handleEditClick = (e) => {
        e.preventDefault();
        onEdit(task);
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        setShowDeleteDialog(false);
        onDelete(task);
    };

    const handleStatusChange = (newStatus) => {
        if (newStatus !== task.status) {
            onStatusChange(newStatus);
        }
    };

    return (
        <>
            <div className="flex gap-2">
                {/* Status dropdown */}
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-sm"
                    >
                        Change Status <i className="fas fa-chevron-down ml-1"></i>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {statusOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    className={`${task.status === option.value ? 'active' : ''}`}
                                    onClick={() => handleStatusChange(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Edit button */}
                <button
                    className="btn btn-sm btn-outline"
                    onClick={handleEditClick}
                >
                    <i className="fas fa-edit"></i>
                    <span className="hidden sm:inline ml-1">Edit</span>
                </button>

                {/* Delete button */}
                <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={handleDeleteClick}
                >
                    <i className="fas fa-trash-alt"></i>
                    <span className="hidden sm:inline ml-1">Delete</span>
                </button>
            </div>

            {/* Delete confirmation dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-lg shadow-lg max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-4">Delete Task</h3>
                            <p className="mb-6">
                                Are you sure you want to delete the task &quot;{task.title}&quot;? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setShowDeleteDialog(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={handleDeleteConfirm}
                                >
                                    Delete Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskActions;