'use client';

export default function DeleteConfirmModal({ equipmentName, onClose, onDelete }) {
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete Equipment?</h3>
                <p className="py-4">
                    Are you sure you want to delete <strong>{equipmentName}</strong>? This action cannot be undone.
                </p>
                <div className="modal-action">
                    <button
                        className="btn btn-error"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}