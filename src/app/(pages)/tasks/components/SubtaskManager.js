'use client';
import { useState } from 'react';

const SubtaskManager = ({ subtasks, onChange }) => {
    const [newSubtask, setNewSubtask] = useState('');

    const handleAddSubtask = (e) => {
        e.preventDefault();
        if (!newSubtask.trim()) return;

        const updatedSubtasks = [
            ...subtasks,
            { title: newSubtask.trim(), completed: false }
        ];

        onChange(updatedSubtasks);
        setNewSubtask('');
    };

    const handleSubtaskChange = (index, value) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].title = value;
        onChange(updatedSubtasks);
    };

    const handleSubtaskCompletion = (index, completed) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].completed = completed;
        onChange(updatedSubtasks);
    };

    const handleRemoveSubtask = (index) => {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        onChange(updatedSubtasks);
    };

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text font-medium">Subtasks</span>
            </label>

            {/* Existing subtasks */}
            {subtasks.length > 0 ? (
                <ul className="mb-2 space-y-2">
                    {subtasks.map((subtask, index) => (
                        <li key={index} className="flex items-center gap-2 bg-base-200 p-2 rounded-lg">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={subtask.completed}
                                onChange={(e) => handleSubtaskCompletion(index, e.target.checked)}
                            />
                            <input
                                type="text"
                                className="input input-sm input-bordered flex-1"
                                value={subtask.title}
                                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm btn-square text-error"
                                onClick={() => handleRemoveSubtask(index)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-sm text-base-content/60 italic mb-2">No subtasks added yet</div>
            )}

            {/* Add new subtask */}
            <div className="flex gap-2">
                <input
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder="Add a new subtask"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask(e)}
                />
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleAddSubtask}
                    disabled={!newSubtask.trim()}
                >
                    <i className="fas fa-plus mr-1"></i> Add
                </button>
            </div>
        </div>
    );
};

export default SubtaskManager;