'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { fetchTaskById, updateTask } from '@/app/services/task';
import Link from 'next/link';

const EditTaskPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Initialize task state
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        assignedTo: '',
        dueDate: '',
        tags: []
    });

    // Load task data
    useEffect(() => {
        const loadTask = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const taskData = await fetchTaskById(id);

                // Format date for input element
                let formattedDueDate = '';
                if (taskData.dueDate) {
                    const date = new Date(taskData.dueDate);
                    formattedDueDate = date.toISOString().substr(0, 16);
                }

                setTask({
                    ...taskData,
                    dueDate: formattedDueDate,
                    assignedTo: taskData.assignedTo || ''
                });

            } catch (err) {
                console.error('Error loading task:', err);
                setError('Failed to load task details. The task may have been deleted or you may not have permission to view it.');
                toast({
                    title: 'Error',
                    description: 'Failed to load task details',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            loadTask();
        }
    }, [id, toast]);

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

            // Update task
            const updatedTask = await updateTask(id, {
                ...task,
                updatedAt: new Date().toISOString()
            });

            toast({
                title: "Success",
                description: "Task has been updated",
                variant: "default",
            });

            // Navigate back to task detail page
            router.push(`/tasks/${id}`);
        } catch (error) {
            console.error("Error updating task:", error);
            toast({
                title: "Error",
                description: "Failed to update task",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        router.push(`/tasks/${id}`);
    };

    if (isLoading) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="animate-fadeIn">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold">Loading Task...</h1>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-12 bg-base-300 rounded mb-4"></div>
                        <div className="h-64 bg-base-300 rounded mb-4"></div>
                        <div className="h-32 bg-base-300 rounded"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="animate-fadeIn">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold">Error</h1>
                        <Link href="/tasks" className="btn btn-outline btn-sm">
                            Back to Tasks
                        </Link>
                    </div>
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Header with title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Edit Task</h1>
                    <Link
                        href={`/tasks/${id}`}
                        className="btn btn-ghost btn-sm"
                    >
                        <i className="fas fa-times mr-2"></i> Cancel
                    </Link>
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
                        <div className="form-control mb-6">
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
                                    <i className="fas fa-save mr-2"></i>
                                )}
                                Update Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .required-field:after {
          content: "*";
          color: #f87272;
          margin-left: 4px;
        }
      `}</style>
        </main>
    );
};

export default EditTaskPage;