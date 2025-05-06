'use client';

import { useState } from 'react';

export default function StatusModal({ currentStatus, currentNotes, onClose, onSubmit }) {
    const [statusForm, setStatusForm] = useState({
        status: currentStatus || '',
        notes: currentNotes || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(statusForm);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Update Status</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={statusForm.status}
                            onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="available">Available</option>
                            <option value="in use">In Use</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="repair">Repair</option>
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Notes</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            value={statusForm.notes}
                            onChange={(e) => setStatusForm({ ...statusForm, notes: e.target.value })}
                            placeholder="Add notes about this status change..."
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Update Status</button>
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}