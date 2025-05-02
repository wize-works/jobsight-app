'use client';

import React from 'react';

const ProjectCard = ({ title, description, status, startDate, endDate }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'text-green-500';
            case 'Completed':
                return 'text-blue-500';
            case 'Pending':
                return 'text-yellow-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <span className={`font-medium ${getStatusColor(status)}`}>{status}</span>
                <div className="text-sm text-gray-500">
                    <p>Start: {startDate}</p>
                    {endDate && <p>End: {endDate}</p>}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;