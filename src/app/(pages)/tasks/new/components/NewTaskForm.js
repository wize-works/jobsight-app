'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createNewTask } from '@/services/task';
import SubtaskManager from '../../components/SubtaskManager';

const NewTaskForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize new task with default values
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'normal',
        assignedTo: '',
        assignedToName: '', // Added to match schema
        dueDate: '',
        tags: [],
        estimatedHours: 0, // Added to match schema
        actualHours: 0, // Added to match schema
        subtasks: [], // Added to match schema
        attachments: [], // Added to match schema
        isCritical: false // Added to match schema
    });

    // Handle form field changes
    const handleInputChange = (field, value) => {
        setTask({
            ...task,
            [field]: value
        });
    };

    // Handle tag input change
    const handleTagChange = (value) => {
        // Convert comma-separated string to array
        const tagsArray = value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        setTask({
            ...task,
            tags: tagsArray
        });
    };

    // Convert tags array to comma-separated string for input
    const tagsToString = (tags) => {
        if (!tags || !Array.isArray(tags)) return '';
        return tags.join(', ');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!task.title.trim()) {
            toast({
                title: "Error",
                description: "Task title is required",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            // Add timestamps and other default values
            const now = new Date().toISOString();
            const taskToSubmit = {
                ...task,
                createdAt: now,
                updatedAt: now,
                createdBy: 'Current User', // Replace with actual user from auth context later
            };

            const newTask = await createNewTask(taskToSubmit);

            toast({
                title: "Success",
                description: "Task has been created",
                variant: "default",
            });

            // Add a small delay before navigation to prevent DOM manipulation issues
            setTimeout(() => {
                router.push(`/tasks/${newTask._id}`);
            }, 100);
        } catch (error) {
            console.error("Error creating task:", error);
            toast({
                title: "Error",
                description: "Failed to create task",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        router.push('/tasks');
    };

    return (
        <div className="animate-fadeIn">
            {/* Header with title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Create New Task</h1>
                <button
                    onClick={handleCancel}
                    className="btn btn-ghost btn-sm"
                >
                    <i className="fas fa-times mr-2"></i> Cancel
                </button>
            </div>

            {/* Task form */}
            <div className="bg-base-100 rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text required-field">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter task title"
                            className="input input-bordered w-full"
                            value={task.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            placeholder="Enter task description"
                            className="textarea textarea-bordered h-24"
                            value={task.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        ></textarea>
                    </div>

                    {/* Status and Priority */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Status</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={task.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Priority</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={task.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                            >
                                <option value="urgent">Urgent</option>
                                <option value="high">High</option>
                                <option value="normal">Normal</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Assigned To and Due Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Assigned To</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter assignee name"
                                className="input input-bordered w-full"
                                value={task.assignedTo}
                                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Date</span>
                            </label>
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full"
                                value={task.dueDate}
                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Tags (comma-separated)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. design, bug, feature"
                            className="input input-bordered w-full"
                            value={tagsToString(task.tags)}
                            onChange={(e) => handleTagChange(e.target.value)}
                        />
                    </div>

                    {/* Time Tracking */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Estimated Hours</span>
                            </label>
                            <input
                                type="number"
                                placeholder="0.0"
                                className="input input-bordered w-full"
                                min="0"
                                step="0.5"
                                value={task.estimatedHours}
                                onChange={(e) => handleInputChange('estimatedHours', e.target.value ? Number(e.target.value) : '')}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Actual Hours</span>
                            </label>
                            <input
                                type="number"
                                placeholder="0.0"
                                className="input input-bordered w-full"
                                min="0"
                                step="0.5"
                                value={task.actualHours}
                                onChange={(e) => handleInputChange('actualHours', e.target.value ? Number(e.target.value) : '')}
                            />
                        </div>
                    </div>

                    {/* Critical Flag */}
                    <div className="form-control mb-4">
                        <label className="label cursor-pointer justify-start gap-4">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={task.isCritical}
                                onChange={(e) => handleInputChange('isCritical', e.target.checked)}
                            />
                            <span className="label-text">Mark as Critical Task</span>
                        </label>
                    </div>

                    {/* Subtasks */}
                    <div className="mb-6">
                        <SubtaskManager
                            subtasks={task.subtasks}
                            onChange={(updatedSubtasks) => handleInputChange('subtasks', updatedSubtasks)}
                        />
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting || !task.title.trim()}
                        >
                            {isSubmitting ? (
                                <span className="loading loading-spinner loading-xs mr-2"></span>
                            ) : (
                                <i className="fas fa-plus mr-2"></i>
                            )}
                            Create Task
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .required-field:after {
                    content: "*";
                    color: #f87272;
                    margin-left: 4px;
                }
            `}</style>
        </div>
    );
};

export default NewTaskForm;