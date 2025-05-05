'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEquipmentById, updateEquipmentStatus, assignEquipment, scheduleMaintenance, deleteEquipment, fetchEquipment } from '@/app/services/equipment';
import { useToast } from '@/hooks/use-toast';

export default function EquipmentDetailPage({ params }) {
    const id = params.id;
    const router = useRouter();
    const { toast } = useToast();

    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    // Form states
    const [assignForm, setAssignForm] = useState({
        projectId: '',
        location: '',
        operator: ''
    });

    const [maintenanceForm, setMaintenanceForm] = useState({
        maintenanceDate: '',
        notes: ''
    });

    const [statusForm, setStatusForm] = useState({
        status: '',
        notes: ''
    });

    const loadEquipmentData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchEquipmentById(id);
            setEquipment(data);

            // Initialize form data with current values
            setStatusForm({ status: data.status, notes: data.notes || '' });
            setAssignForm({
                projectId: data.assignedProject || '',
                location: data.location || '',
                operator: data.operator || ''
            });

            // Format date for the date input (YYYY-MM-DD)
            const nextMaintenanceDate = data.nextMaintenance ?
                new Date(data.nextMaintenance).toISOString().split('T')[0] :
                '';

            setMaintenanceForm({
                maintenanceDate: nextMaintenanceDate,
                notes: data.notes || ''
            });
        } catch (error) {
            toast({
                title: 'Error loading equipment',
                description: error.message || 'Could not load equipment details',
                variant: 'destructive',
            });
            router.push('/equipment');
        } finally {
            setLoading(false);
        }
    }, [id, router, toast]);

    const loadProjects = useCallback(async () => {
        try {
            const projectsData = await fetchEquipment();
            setProjects(projectsData);
        } catch (error) {
            toast({
                title: 'Error loading projects',
                description: error.message || 'Could not load project list',
                variant: 'destructive',
            });
        }
    }, [toast]);

    useEffect(() => {
        loadEquipmentData();
        loadProjects();
    }, [loadEquipmentData, loadProjects]);

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            const updatedEquipment = await updateEquipmentStatus(
                id,
                statusForm.status,
                { notes: statusForm.notes }
            );

            setEquipment(updatedEquipment);
            setShowStatusModal(false);

            toast({
                title: 'Status updated',
                description: `Equipment status changed to ${statusForm.status}`,
            });
        } catch (error) {
            toast({
                title: 'Error updating status',
                description: error.message || 'Could not update equipment status',
                variant: 'destructive',
            });
        }
    };

    const handleAssignEquipment = async (e) => {
        e.preventDefault();
        try {
            const updatedEquipment = await assignEquipment(
                id,
                assignForm.projectId,
                assignForm.location,
                assignForm.operator
            );

            setEquipment(updatedEquipment);
            setShowAssignModal(false);

            toast({
                title: 'Equipment assigned',
                description: 'Equipment has been assigned to the project',
            });
        } catch (error) {
            toast({
                title: 'Error assigning equipment',
                description: error.message || 'Could not assign equipment to project',
                variant: 'destructive',
            });
        }
    };

    const handleScheduleMaintenance = async (e) => {
        e.preventDefault();
        try {
            const updatedEquipment = await scheduleMaintenance(
                id,
                maintenanceForm.maintenanceDate,
                maintenanceForm.notes
            );

            setEquipment(updatedEquipment);
            setShowMaintenanceModal(false);

            toast({
                title: 'Maintenance scheduled',
                description: `Maintenance scheduled for ${new Date(maintenanceForm.maintenanceDate).toLocaleDateString()}`,
            });
        } catch (error) {
            toast({
                title: 'Error scheduling maintenance',
                description: error.message || 'Could not schedule maintenance',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteEquipment = async () => {
        try {
            await deleteEquipment(id);

            toast({
                title: 'Equipment deleted',
                description: 'Equipment has been successfully removed',
            });

            router.push('/equipment');
        } catch (error) {
            toast({
                title: 'Error deleting equipment',
                description: error.message || 'Could not delete equipment',
                variant: 'destructive',
            });
        }
    };

    const handleEditEquipment = () => {
        router.push(`/equipment/${id}/edit`);
    };

    // Helper function for status badge
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'available':
                return <span className="badge badge-success">{status}</span>;
            case 'in use':
                return <span className="badge badge-info">{status}</span>;
            case 'maintenance':
                return <span className="badge badge-warning">{status}</span>;
            case 'repair':
                return <span className="badge badge-error">{status}</span>;
            default:
                return <span className="badge">{status}</span>;
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-2 text-muted-foreground">Loading equipment details...</p>
                </div>
            </div>
        );
    }

    if (!equipment) {
        return (
            <div className="container mx-auto p-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <h2 className="card-title justify-center text-2xl mb-2">Equipment Not Found</h2>
                        <p>The equipment you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                        <div className="card-actions justify-center mt-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => router.push('/equipment')}
                            >
                                Back to Equipment List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const projectName = equipment.assignedProject ?
        (projects.find(p => p.id === equipment.assignedProject)?.name || 'Unknown Project') :
        'None';

    return (
        <div className="container mx-auto p-4">
            {/* Back and actions header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => router.push('/equipment')}
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold ml-2">{equipment.name}</h1>
                    {getStatusBadge(equipment.status)}
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={handleEditEquipment}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main details card */}
                <div className="card bg-base-100 shadow-lg lg:col-span-2">
                    <div className="card-body">
                        <h2 className="card-title">Equipment Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">ID</p>
                                    <p className="font-medium">{equipment.id}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Type</p>
                                    <p className="font-medium">{equipment.type}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <div className="flex items-center">
                                        {getStatusBadge(equipment.status)}
                                        <button
                                            className="btn btn-ghost btn-xs ml-2"
                                            onClick={() => setShowStatusModal(true)}
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Condition</p>
                                    <p className="font-medium">{equipment.condition || 'Not specified'}</p>
                                </div>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium">{equipment.location || 'Not specified'}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Assigned Project</p>
                                    <div className="flex items-center">
                                        <p className="font-medium">{projectName}</p>
                                        <button
                                            className="btn btn-ghost btn-xs ml-2"
                                            onClick={() => setShowAssignModal(true)}
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Operator</p>
                                    <p className="font-medium">{equipment.operator || 'Not assigned'}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Hours Used</p>
                                    <p className="font-medium">{equipment.hoursUsed || 'Not tracked'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="text-sm text-muted-foreground">Notes</p>
                            <p className="bg-base-200 p-3 rounded-lg mt-1">
                                {equipment.notes || 'No notes available.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Side cards */}
                <div className="flex flex-col gap-6">
                    {/* Maintenance card */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title">Maintenance</h2>
                            <div className="mt-2">
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Last Maintenance</p>
                                    <p className="font-medium">
                                        {equipment.lastMaintenance ? new Date(equipment.lastMaintenance).toLocaleDateString() : 'Not recorded'}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Next Maintenance</p>
                                    <div className="flex items-center">
                                        <p className={`font-medium ${new Date(equipment.nextMaintenance) < new Date() ? 'text-error' : ''}`}>
                                            {equipment.nextMaintenance ? new Date(equipment.nextMaintenance).toLocaleDateString() : 'Not scheduled'}
                                        </p>
                                        <button
                                            className="btn btn-ghost btn-xs ml-2"
                                            onClick={() => setShowMaintenanceModal(true)}
                                        >
                                            Schedule
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purchase info card */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title">Purchase Information</h2>
                            <div className="mt-2">
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                                    <p className="font-medium">
                                        {equipment.purchaseDate ? new Date(equipment.purchaseDate).toLocaleDateString() : 'Not recorded'}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground">Purchase Price</p>
                                    <p className="font-medium">
                                        {equipment.purchasePrice ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(equipment.purchasePrice) : 'Not recorded'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Update Modal */}
            {showStatusModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Update Status</h3>
                        <form onSubmit={handleUpdateStatus}>
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
                                    onClick={() => setShowStatusModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowStatusModal(false)}></div>
                </div>
            )}

            {/* Assign to Project Modal */}
            {showAssignModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Assign to Project</h3>
                        <form onSubmit={handleAssignEquipment}>
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
                                        <option key={project.id} value={project.id}>
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
                                    onClick={() => setShowAssignModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowAssignModal(false)}></div>
                </div>
            )}

            {/* Schedule Maintenance Modal */}
            {showMaintenanceModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Schedule Maintenance</h3>
                        <form onSubmit={handleScheduleMaintenance}>
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
                                    onClick={() => setShowMaintenanceModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowMaintenanceModal(false)}></div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Equipment?</h3>
                        <p className="py-4">
                            Are you sure you want to delete <strong>{equipment.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={handleDeleteEquipment}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)}></div>
                </div>
            )}
        </div>
    );
}