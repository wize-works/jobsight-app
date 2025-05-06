'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { updateExistingEquipment, deleteExistingEquipment } from '@/services/equipment';
import StatusModal from './StatusModal';
import AssignModal from './AssignModal';
import MaintenanceModal from './MaintenanceModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function EquipmentDetail({ equipment, projects }) {
    const router = useRouter();
    const { toast } = useToast();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

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

    const handleUpdateStatus = async (statusData) => {
        try {
            const updatedEquipment = await updateExistingEquipment(
                equipment._id,
                statusData
            );

            toast({
                title: 'Status updated',
                description: `Equipment status changed to ${statusData.status}`,
            });

            router.refresh();
            setShowStatusModal(false);
        } catch (error) {
            toast({
                title: 'Error updating status',
                description: error.message || 'Could not update equipment status',
                variant: 'destructive',
            });
        }
    };

    const handleAssignEquipment = async (assignData) => {
        try {
            await updateExistingEquipment(
                equipment._id,
                assignData
            );

            toast({
                title: 'Equipment assigned',
                description: 'Equipment has been assigned to the project',
            });

            router.refresh();
            setShowAssignModal(false);
        } catch (error) {
            toast({
                title: 'Error assigning equipment',
                description: error.message || 'Could not assign equipment to project',
                variant: 'destructive',
            });
        }
    };

    const handleScheduleMaintenance = async (maintenanceData) => {
        try {
            await updateExistingEquipment(
                equipment._id,
                {
                    nextMaintenance: maintenanceData.maintenanceDate,
                    lastMaintenance: new Date().toISOString(),
                    notes: maintenanceData.notes
                }
            );

            toast({
                title: 'Maintenance scheduled',
                description: `Maintenance scheduled for ${new Date(maintenanceData.maintenanceDate).toLocaleDateString()}`,
            });

            router.refresh();
            setShowMaintenanceModal(false);
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
            await deleteExistingEquipment(equipment._id);

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
        router.push(`/equipment/${equipment._id}/edit`);
    };

    const projectName = equipment.assignedProject ?
        (projects.find(p => p._id === equipment.assignedProject)?.name || 'Unknown Project') :
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
                                    <p className="font-medium">{equipment._id}</p>
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
                                        <p className={`font-medium ${equipment.nextMaintenance && new Date(equipment.nextMaintenance) < new Date() ? 'text-error' : ''}`}>
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
                <StatusModal
                    currentStatus={equipment.status}
                    currentNotes={equipment.notes || ''}
                    onClose={() => setShowStatusModal(false)}
                    onSubmit={handleUpdateStatus}
                />
            )}

            {/* Assign to Project Modal */}
            {showAssignModal && (
                <AssignModal
                    currentProjectId={equipment.assignedProject || ''}
                    currentLocation={equipment.location || ''}
                    currentOperator={equipment.operator || ''}
                    projects={projects}
                    onClose={() => setShowAssignModal(false)}
                    onSubmit={handleAssignEquipment}
                />
            )}

            {/* Schedule Maintenance Modal */}
            {showMaintenanceModal && (
                <MaintenanceModal
                    currentDate={equipment.nextMaintenance ? new Date(equipment.nextMaintenance).toISOString().split('T')[0] : ''}
                    currentNotes={equipment.notes || ''}
                    onClose={() => setShowMaintenanceModal(false)}
                    onSubmit={handleScheduleMaintenance}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    equipmentName={equipment.name}
                    onClose={() => setShowDeleteConfirm(false)}
                    onDelete={handleDeleteEquipment}
                />
            )}
        </div>
    );
}