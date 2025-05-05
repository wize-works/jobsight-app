'use client';

import React from 'react';
import Link from 'next/link';

export const ProjectCard = ({ project }) => {
    // Extract properties with fallbacks for missing data
    const {
        _id: id,
        name: title,
        description,
        status,
        startDate,
        endDate,
        progress = 0,
        client
    } = project || {};

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress':
                return 'bg-primary text-primary-content';
            case 'completed':
                return 'bg-success text-success-content';
            case 'pending':
                return 'bg-warning text-warning-content';
            case 'archived':
                return 'bg-neutral text-neutral-content';
            default:
                return 'bg-base-300 text-base-content';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const statusLabel = status ? status.replace(/_/g, ' ') : 'Unknown';

    return (
        <Link href={`/projects/${id}`} className="block w-full max-w-sm transition-transform duration-300 hover:-translate-y-1 mx-auto">
            <div className="card bg-white shadow-md border-l-4 border-primary hover:shadow-lg transition-all duration-300 h-full">
                <div className="card-body p-5">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-lg font-semibold mb-1 line-clamp-1">{title || 'Untitled Project'}</h2>
                        <span className={`badge ${getStatusColor(status)} capitalize text-xs px-2 py-1 rounded-md`}>
                            {statusLabel}
                        </span>
                    </div>

                    {client && (
                        <div className="text-sm text-base-content/70 mb-2">
                            <i className="fas fa-building mr-1 opacity-70"></i> {client}
                        </div>
                    )}

                    {description && (
                        <p className="text-sm text-base-content/80 mb-3 line-clamp-2">{description}</p>
                    )}

                    {progress > 0 && (
                        <div className="w-full mt-1 mb-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <progress
                                className="progress progress-primary w-full"
                                value={progress}
                                max="100"
                            ></progress>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-base-content/70 mt-auto pt-1">
                        <div>
                            <i className="fas fa-calendar-alt mr-1"></i> {formatDate(startDate)}
                        </div>
                        {endDate && (
                            <div>
                                <i className="fas fa-flag-checkered mr-1"></i> {formatDate(endDate)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;