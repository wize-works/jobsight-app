'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEquipment } from '@/services/equipment';
import { useToast } from '@/hooks/use-toast';
import EquipmentCard from './components/EquipmentCard';

export default function EquipmentPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        location: '',
        projectId: '',
    });

    const loadEquipment = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchEquipment(filters);
            setEquipment(data);
        } catch (error) {
            toast({
                title: 'Error loading equipment',
                description: error.message || 'Could not load equipment data',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [filters, toast]);

    useEffect(() => {
        loadEquipment();
    }, [loadEquipment]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleCreateEquipment = () => {
        router.push('/equipment/new');
    };

    const handleViewEquipment = (id) => {
        router.push(`/equipment/${id}`);
    };

    // Calculate status counts for the summary cards
    const getStatusCounts = () => {
        const counts = {
            active: equipment.filter(e => e.status === 'active' || e.status === 'available').length,
            inUse: equipment.filter(e => e.status === 'in use').length,
            maintenance: equipment.filter(e => e.status === 'maintenance').length,
            repair: equipment.filter(e => e.status === 'repair').length,
            total: equipment.length
        };
        return counts;
    };

    const statusCounts = getStatusCounts();

    return (
        <div className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Equipment Management</h1>
                <button
                    onClick={handleCreateEquipment}
                    className="btn btn-primary mt-2 sm:mt-0"
                >
                    Add New Equipment
                </button>
            </div>

            {/* Status Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4">
                        <h2 className="card-title text-base">Total Equipment</h2>
                        <p className="text-2xl font-bold">{statusCounts.total}</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4">
                        <h2 className="card-title text-base text-success">Available</h2>
                        <p className="text-2xl font-bold text-success">{statusCounts.active}</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4">
                        <h2 className="card-title text-base text-info">In Use</h2>
                        <p className="text-2xl font-bold text-info">{statusCounts.inUse}</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4">
                        <h2 className="card-title text-base text-warning">Maintenance</h2>
                        <p className="text-2xl font-bold text-warning">{statusCounts.maintenance}</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4">
                        <h2 className="card-title text-base text-error">Repair</h2>
                        <p className="text-2xl font-bold text-error">{statusCounts.repair}</p>
                    </div>
                </div>
            </div>

            {/* Filters and view options */}
            <div className="bg-base-100 rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="available">Available</option>
                                    <option value="in use">In Use</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="repair">Repair</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="">All Types</option>
                                    <option value="Heavy Machinery">Heavy Machinery</option>
                                    <option value="Power Equipment">Power Equipment</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Support Equipment">Support Equipment</option>
                                    <option value="Access Equipment">Access Equipment</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search location..."
                                    className="input input-bordered w-full"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end">
                        <label className="label">
                            <span className="label-text">View</span>
                        </label>
                        <div className="btn-group self-end">
                            <button
                                className={`btn ${viewMode === 'grid' ? 'btn-active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <i className="fas fa-th-large"></i>
                            </button>
                            <button
                                className={`btn ${viewMode === 'table' ? 'btn-active' : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                <i className="fas fa-list"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        className="btn btn-outline"
                        onClick={() => setFilters({
                            status: '',
                            type: '',
                            location: '',
                            projectId: '',
                        })}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="p-8 text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-2 text-muted-foreground">Loading equipment data...</p>
                </div>
            ) : equipment.length === 0 ? (
                // Empty state
                <div className="text-center py-12 bg-base-100 rounded-lg shadow-md">
                    <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                        <i className="fas fa-tools text-2xl text-base-content/50"></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No equipment found</h3>
                    <p className="text-base-content/60 mb-6">
                        {Object.values(filters).some(v => v !== '')
                            ? "Try adjusting your filters"
                            : "Add your first equipment item to get started"}
                    </p>
                    <button
                        onClick={handleCreateEquipment}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-plus mr-2"></i> Add New Equipment
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {equipment.map((item) => (
                        <EquipmentCard key={item.id} equipment={item} />
                    ))}
                </div>
            ) : (
                // Table View
                <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th className="bg-base-200">Equipment</th>
                                    <th className="bg-base-200">Status</th>
                                    <th className="bg-base-200">Type</th>
                                    <th className="bg-base-200 hidden sm:table-cell">Location</th>
                                    <th className="bg-base-200 hidden md:table-cell">Maintenance</th>
                                    <th className="bg-base-200 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipment.map((item) => (
                                    <tr key={item.id} className="hover:bg-base-200 hover:shadow-sm transition-all duration-200">
                                        <td>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-muted-foreground">{item.id}</div>
                                        </td>
                                        <td>
                                            <div className="flex items-center">
                                                {getStatusIndicator(item.status)}
                                                <span className="ml-2">{item.status}</span>
                                            </div>
                                        </td>
                                        <td>{item.type}</td>
                                        <td className="hidden sm:table-cell">{item.location || 'N/A'}</td>
                                        <td className="hidden md:table-cell">
                                            {item.nextMaintenance ? (
                                                <span className={
                                                    new Date(item.nextMaintenance) < new Date() ? 'text-error' : ''
                                                }>
                                                    {new Date(item.nextMaintenance).toLocaleDateString()}
                                                </span>
                                            ) : 'Not scheduled'}
                                        </td>
                                        <td className="text-right">
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => handleViewEquipment(item.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper function for status indicators (same as in EquipmentTable component)
const getStatusIndicator = (status) => {
    switch (status?.toLowerCase()) {
        case 'active':
        case 'available':
            return <span className="badge badge-sm badge-success"></span>;
        case 'in use':
            return <span className="badge badge-sm badge-info"></span>;
        case 'maintenance':
            return <span className="badge badge-sm badge-warning"></span>;
        case 'repair':
            return <span className="badge badge-sm badge-error"></span>;
        default:
            return <span className="badge badge-sm badge-ghost"></span>;
    }
};