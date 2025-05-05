'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createEquipment, updateEquipment, fetchEquipment } from '@/app/services/equipment';
import { useToast } from '@/hooks/use-toast';

const EquipmentForm = ({ equipment, isEditing = false }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        status: 'available',
        location: '',
        assignedProject: '',
        operator: '',
        purchaseDate: '',
        purchasePrice: '',
        condition: 'Good',
        hoursUsed: '',
        notes: '',
        lastMaintenance: '',
        nextMaintenance: ''
    });

    // Validation errors
    const [errors, setErrors] = useState({});

    const loadProjects = useCallback(async () => {
        try {
            setLoading(true);
            const projectsData = await fetchEquipment();
            setProjects(projectsData);
        } catch (error) {
            toast({
                title: 'Error loading projects',
                description: error.message || 'Could not load project list',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        // If editing, populate the form with existing data
        if (isEditing && equipment) {
            const formattedPurchaseDate = equipment.purchaseDate ?
                new Date(equipment.purchaseDate).toISOString().split('T')[0] : '';

            const formattedLastMaintenance = equipment.lastMaintenance ?
                new Date(equipment.lastMaintenance).toISOString().split('T')[0] : '';

            const formattedNextMaintenance = equipment.nextMaintenance ?
                new Date(equipment.nextMaintenance).toISOString().split('T')[0] : '';

            setFormData({
                name: equipment.name || '',
                type: equipment.type || '',
                status: equipment.status || 'available',
                location: equipment.location || '',
                assignedProject: equipment.assignedProject || '',
                operator: equipment.operator || '',
                purchaseDate: formattedPurchaseDate,
                purchasePrice: equipment.purchasePrice?.toString() || '',
                condition: equipment.condition || 'Good',
                hoursUsed: equipment.hoursUsed?.toString() || '',
                notes: equipment.notes || '',
                lastMaintenance: formattedLastMaintenance,
                nextMaintenance: formattedNextMaintenance
            });
        }

        // Load projects for assignedProject dropdown
        loadProjects();
    }, [isEditing, equipment, loadProjects]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear validation error when field is edited
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.type.trim()) {
            newErrors.type = 'Type is required';
        }

        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        if (formData.purchasePrice && isNaN(Number(formData.purchasePrice))) {
            newErrors.purchasePrice = 'Purchase price must be a number';
        }

        if (formData.hoursUsed && isNaN(Number(formData.hoursUsed))) {
            newErrors.hoursUsed = 'Hours used must be a number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast({
                title: 'Validation Error',
                description: 'Please correct the errors in the form',
                variant: 'destructive',
            });
            return;
        }

        try {
            setSubmitting(true);

            // Format the data for API
            const payloadData = {
                ...formData,
                purchasePrice: formData.purchasePrice ? Number(formData.purchasePrice) : null,
                hoursUsed: formData.hoursUsed ? Number(formData.hoursUsed) : null,
            };

            if (isEditing) {
                // Update existing equipment
                await updateEquipment(equipment.id, payloadData);
                toast({
                    title: 'Equipment Updated',
                    description: `${formData.name} has been updated successfully`,
                });
                router.push(`/equipment/${equipment.id}`);
            } else {
                // Create new equipment
                const newEquipment = await createEquipment(payloadData);
                toast({
                    title: 'Equipment Added',
                    description: `${formData.name} has been added successfully`,
                });
                router.push(`/equipment/${newEquipment.id}`);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || `Could not ${isEditing ? 'update' : 'create'} equipment`,
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (isEditing && equipment) {
            router.push(`/equipment/${equipment.id}`);
        } else {
            router.push('/equipment');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-6">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-4">Basic Information</h3>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                                    placeholder="Equipment name"
                                />
                                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type*</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={`select select-bordered ${errors.type ? 'select-error' : ''}`}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Heavy Machinery">Heavy Machinery</option>
                                    <option value="Power Equipment">Power Equipment</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Support Equipment">Support Equipment</option>
                                    <option value="Access Equipment">Access Equipment</option>
                                </select>
                                {errors.type && <p className="text-error text-sm mt-1">{errors.type}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Status*</span>
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={`select select-bordered ${errors.status ? 'select-error' : ''}`}
                                >
                                    <option value="available">Available</option>
                                    <option value="active">Active</option>
                                    <option value="in use">In Use</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="repair">Repair</option>
                                </select>
                                {errors.status && <p className="text-error text-sm mt-1">{errors.status}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Condition</span>
                                </label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="select select-bordered"
                                >
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-4">Maintenance Information</h3>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Maintenance</span>
                                </label>
                                <input
                                    type="date"
                                    name="lastMaintenance"
                                    value={formData.lastMaintenance}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Next Maintenance</span>
                                </label>
                                <input
                                    type="date"
                                    name="nextMaintenance"
                                    value={formData.nextMaintenance}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-4">Assignment Information</h3>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Assigned Project</span>
                                </label>
                                <select
                                    name="assignedProject"
                                    value={formData.assignedProject}
                                    onChange={handleChange}
                                    className="select select-bordered"
                                    disabled={loading}
                                >
                                    <option value="">Not Assigned</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Current location"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Operator</span>
                                </label>
                                <input
                                    type="text"
                                    name="operator"
                                    value={formData.operator}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Assigned operator"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-4">Purchase Information</h3>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Purchase Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Purchase Price ($)</span>
                                </label>
                                <input
                                    type="text"
                                    name="purchasePrice"
                                    value={formData.purchasePrice}
                                    onChange={handleChange}
                                    className={`input input-bordered ${errors.purchasePrice ? 'input-error' : ''}`}
                                    placeholder="Cost in dollars"
                                />
                                {errors.purchasePrice && <p className="text-error text-sm mt-1">{errors.purchasePrice}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Hours Used</span>
                                </label>
                                <input
                                    type="text"
                                    name="hoursUsed"
                                    value={formData.hoursUsed}
                                    onChange={handleChange}
                                    className={`input input-bordered ${errors.hoursUsed ? 'input-error' : ''}`}
                                    placeholder="Operating hours"
                                />
                                {errors.hoursUsed && <p className="text-error text-sm mt-1">{errors.hoursUsed}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes section - full width */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title text-lg mb-4">Notes</h3>

                    <div className="form-control">
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="textarea textarea-bordered"
                            placeholder="Additional information or notes about this equipment"
                            rows={4}
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Form buttons */}
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-ghost"
                    disabled={submitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                    disabled={submitting}
                >
                    {isEditing ? 'Update Equipment' : 'Add Equipment'}
                </button>
            </div>
        </form>
    );
};

export default EquipmentForm;