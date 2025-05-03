'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const EquipmentCard = ({ equipment }) => {
    // Extract properties with fallbacks for missing data
    const {
        id,
        name,
        type,
        status,
        location,
        condition,
        lastMaintenance,
        nextMaintenance,
        hoursUsed,
        operator,
        notes
    } = equipment || {};

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'available':
                return 'bg-success text-success-content';
            case 'in use':
                return 'bg-info text-info-content';
            case 'maintenance':
                return 'bg-warning text-warning-content';
            case 'repair':
                return 'bg-error text-error-content';
            default:
                return 'bg-base-300 text-base-content';
        }
    };

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'Excellent':
                return 'text-success';
            case 'Good':
                return 'text-info';
            case 'Fair':
                return 'text-warning';
            case 'Poor':
                return 'text-error';
            default:
                return 'text-base-content';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not scheduled';
        return format(new Date(dateString), 'MMM d, yyyy');
    };

    // Check if maintenance is overdue
    const isMaintenanceOverdue = nextMaintenance && new Date(nextMaintenance) < new Date();

    return (
        <Link href={`/equipment/${id}`} className="block w-full transition-transform duration-300 hover:-translate-y-1">
            <div className="card bg-white shadow-md border-l-4 border-primary hover:shadow-lg transition-all duration-300 h-full">
                <div className="card-body p-5">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-lg font-semibold mb-1 line-clamp-1">{name || 'Unnamed Equipment'}</h2>
                        <span className={`badge ${getStatusColor(status)} capitalize text-xs px-2 py-1 rounded-md`}>
                            {status}
                        </span>
                    </div>

                    <div className="text-sm text-base-content/70 mb-2">
                        <i className="fas fa-tools mr-1 opacity-70"></i> {type || 'Unspecified Type'}
                    </div>

                    {location && (
                        <div className="text-sm text-base-content/70 mb-2">
                            <i className="fas fa-map-marker-alt mr-1 opacity-70"></i> {location}
                        </div>
                    )}

                    {condition && (
                        <div className="text-sm mb-3">
                            <span className="text-base-content/70">Condition: </span>
                            <span className={getConditionColor(condition)}>{condition}</span>
                        </div>
                    )}

                    {/* Maintenance information */}
                    <div className="text-xs mb-1">
                        <span className="text-base-content/70">Next Maintenance: </span>
                        <span className={isMaintenanceOverdue ? 'text-error font-medium' : ''}>
                            {formatDate(nextMaintenance)}
                        </span>
                    </div>

                    {/* Notes preview if available */}
                    {notes && (
                        <div className="mt-2 text-sm">
                            <p className="line-clamp-2 text-base-content/80 italic">{notes}</p>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-base-content/70 mt-3 pt-2 border-t border-base-200">
                        <div>
                            {operator ? (
                                <><i className="fas fa-user mr-1"></i> {operator}</>
                            ) : (
                                <><i className="fas fa-circle-info mr-1"></i> No operator assigned</>
                            )}
                        </div>
                        <div>
                            {hoursUsed ? (
                                <><i className="fas fa-clock mr-1"></i> {hoursUsed} hrs</>
                            ) : (
                                <span className="opacity-50">Hours not tracked</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EquipmentCard;