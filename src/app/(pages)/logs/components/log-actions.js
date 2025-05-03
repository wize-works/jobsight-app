import { useState } from 'react';

const LogActions = ({ log, onEdit, onDelete }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleEditClick = (e) => {
        e.preventDefault();
        onEdit(log);
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        setShowDeleteDialog(false);
        onDelete(log);
    };

    return (
        <>
            <div className="flex gap-2">
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
                            <h3 className="text-lg font-bold mb-4">Delete Log</h3>
                            <p className="mb-6">
                                Are you sure you want to delete this daily log from {log.date}? This action cannot be undone.
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
                                    Delete Log
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogActions;