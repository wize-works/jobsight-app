'use client';

import { useState } from 'react';

export default function AssignModal({ currentProjectId, currentLocation, currentOperator, projects, onClose, onSubmit }) {
    const [assignForm, setAssignForm] = useState({
        projectId: currentProjectId || '',
        location: currentLocation || '',
        operator: currentOperator || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            assignedProject: assignForm.projectId,
            location: assignForm.location,
            operator: assignForm.operator
        });
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Assign to Project</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Project</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={assignForm.projectId}
                            onChange={(e) => setAssignForm({ ...assignForm, projectId: e.target.value })}
                        >
                            <option value="">None (Unassigned)</option>
                            {projects.map(project => (
                                <option key={project._id} value={project._id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={assignForm.location}
                            onChange={(e) => setAssignForm({ ...assignForm, location: e.target.value })}
                            placeholder="Current location of equipment"
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Operator</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={assignForm.operator}
                            onChange={(e) => setAssignForm({ ...assignForm, operator: e.target.value })}
                            placeholder="Assigned operator (if any)"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Assign Equipment</button>
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