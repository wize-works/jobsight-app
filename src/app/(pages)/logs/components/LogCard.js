'use client';

import React from 'react';
import Link from 'next/link';

const LogCard = ({ log }) => {
    // Extract properties with fallbacks for missing data
    const {
        _id: id,
        projectName,
        date,
        author,
        summary,
        weather,
        hours = { regular: 0, overtime: 0 },
        safetyIncidents = [],
        qualityIssues = [],
        approvals = {}
    } = log || {};

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get approval status indicator
    const getApprovalStatus = () => {
        if (!approvals.requested) {
            return { color: 'bg-base-300', label: 'Not Submitted' };
        } else if (approvals.approved) {
            return { color: 'bg-success', label: 'Approved' };
        } else {
            return { color: 'bg-warning', label: 'Pending Approval' };
        }
    };

    const approvalStatus = getApprovalStatus();
    const totalHours = (hours?.regular || 0) + (hours?.overtime || 0);
    const hasIncidents = (safetyIncidents?.length || 0) > 0 || (qualityIssues?.length || 0) > 0;

    return (
        <Link href={`/logs/${id}`} className="block w-full transition-transform duration-300 hover:-translate-y-1">
            <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <div className="card-body p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="card-title text-lg font-semibold mb-1 line-clamp-1">
                                {formatDate(date)}
                            </h2>
                            <span className="text-sm text-base-content/70 mb-2 block">
                                {projectName || 'Unnamed Project'}
                            </span>
                        </div>
                        <span className={`badge ${approvalStatus.color} text-white text-xs px-2 py-1 rounded-md`}>
                            {approvalStatus.label}
                        </span>
                    </div>

                    {author && (
                        <div className="text-sm text-base-content/70 mb-2">
                            <i className="fas fa-user mr-1 opacity-70"></i> {author}
                        </div>
                    )}

                    {summary && (
                        <p className="text-sm text-base-content/80 mb-3 line-clamp-2">{summary}</p>
                    )}

                    <div className="flex flex-wrap gap-3 items-center mt-auto pt-2 border-t border-base-300/30">
                        {weather && (
                            <div className="flex items-center text-xs">
                                <i className="fas fa-cloud-sun mr-1 text-base-content/60"></i>
                                <span>{weather.conditions}, {weather.temperature}°F</span>
                            </div>
                        )}

                        <div className="flex items-center text-xs">
                            <i className="fas fa-clock mr-1 text-base-content/60"></i>
                            <span>{totalHours} hours</span>
                        </div>

                        {hasIncidents && (
                            <div className="flex items-center text-xs text-warning">
                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                <span>Incidents Reported</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LogCard;