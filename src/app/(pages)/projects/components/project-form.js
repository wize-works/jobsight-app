'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const ProjectForm = ({ project, onSubmit, isEdit = false }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        client: '',
        status: 'planning',
        startDate: '',
        endDate: '',
        budget: '',
        progress: 0,
        location: '',
        notes: ''
    });

    // If editing an existing project, populate the form
    useEffect(() => {
        if (isEdit && project) {
            setFormData({
                name: project.name || '',
                description: project.description || '',
                client: project.client || '',
                status: project.status || 'planning',
                startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
                endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
                budget: project.budget || '',
                progress: project.progress || project.completion || 0,
                location: project.location || '',
                notes: project.notes || ''
            });
        }
    }, [isEdit, project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'progress' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name.trim()) {
            toast({
                title: "Validation Error",
                description: "Project name is required",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(formData);
            toast({
                title: `Project ${isEdit ? 'Updated' : 'Created'}`,
                description: `The project ${isEdit ? 'has been updated' : 'has been created'} successfully.`,
            });
            router.push('/projects');
        } catch (error) {
            console.error("Error submitting project:", error);
            toast({
                title: "Error",
                description: `Failed to ${isEdit ? 'update' : 'create'} project`,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-lg p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Project Name*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Client</span>
                        </label>
                        <input
                            type="text"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            placeholder="Enter client name"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Description</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter project description"
                        className="textarea textarea-bordered h-24"
                    ></textarea>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Status</span>
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="planning">Planning</option>
                            <option value="active">Active</option>
                            <option value="on hold">On Hold</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Start Date</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Due Date</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Budget</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <input
                                type="text"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="input input-bordered w-full pl-8"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Progress (%)</span>
                            <span className="label-text-alt">{formData.progress}%</span>
                        </label>
                        <input
                            type="range"
                            name="progress"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={handleChange}
                            className="range range-primary"
                            step="5"
                        />
                        <div className="w-full flex justify-between text-xs px-2 mt-1">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Location</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Project location"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Notes</span>
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Additional notes"
                        className="textarea textarea-bordered h-24"
                    ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                {isEdit ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            isEdit ? 'Update Project' : 'Create Project'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;