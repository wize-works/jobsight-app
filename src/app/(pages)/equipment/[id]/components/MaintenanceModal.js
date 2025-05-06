'use client';

import { useState } from 'react';

export default function MaintenanceModal({ currentDate, currentNotes, onClose, onSubmit }) {
    const [maintenanceForm, setMaintenanceForm] = useState({
        maintenanceDate: currentDate || '',
        notes: currentNotes || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(maintenanceForm);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Schedule Maintenance</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Maintenance Date</span>
                        </label>
                        <input
                            type="date"
                            className="input input-bordered"
                            value={maintenanceForm.maintenanceDate}
                            onChange={(e) => setMaintenanceForm({ ...maintenanceForm, maintenanceDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Maintenance Notes</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            value={maintenanceForm.notes}
                            onChange={(e) => setMaintenanceForm({ ...maintenanceForm, notes: e.target.value })}
                            placeholder="Details about the maintenance..."
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Schedule</button>
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