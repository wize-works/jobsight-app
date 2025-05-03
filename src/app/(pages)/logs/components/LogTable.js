'use client';

import React from 'react';
import Link from 'next/link';

const LogTable = ({ logs, loading }) => {
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

    // Get approval status badge
    const getApprovalBadge = (approvals) => {
        if (!approvals || !approvals.requested) {
            return <span className="badge badge-ghost">Not Submitted</span>;
        } else if (approvals.approved) {
            return <span className="badge badge-success text-white">Approved</span>;
        } else {
            return <span className="badge badge-warning text-white">Pending</span>;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">Date</th>
                        <th className="whitespace-nowrap">Project</th>
                        <th className="hidden sm:table-cell whitespace-nowrap">Author</th>
                        <th className="hidden md:table-cell whitespace-nowrap">Summary</th>
                        <th className="whitespace-nowrap">Status</th>
                        <th className="hidden lg:table-cell whitespace-nowrap">Hours</th>
                        <th className="whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center p-4">Loading...</td>
                        </tr>
                    ) : logs.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center p-4">No logs found</td>
                        </tr>
                    ) : (
                        logs.map((log) => (
                            <tr key={log._id} className="hover:bg-base-200 hover:shadow-md transition-colors duration-200">
                                <td className="font-medium whitespace-nowrap">{formatDate(log.date)}</td>
                                <td>
                                    <Link href={`/logs/${log._id}`} className="hover:text-primary transition-colors">
                                        {log.projectName || 'Unnamed Project'}
                                    </Link>
                                </td>
                                <td className="hidden sm:table-cell">{log.author}</td>
                                <td className="hidden md:table-cell">
                                    <div className="line-clamp-1 max-w-xs">
                                        {log.summary || 'No summary provided'}
                                    </div>
                                </td>
                                <td>{getApprovalBadge(log.approvals)}</td>
                                <td className="hidden lg:table-cell whitespace-nowrap">
                                    {(log.hours?.regular || 0) + (log.hours?.overtime || 0)} hrs
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/logs/${log._id}`}
                                            className="btn btn-sm btn-ghost"
                                            aria-label="View log"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link
                                            href={`/logs/${log._id}/edit`}
                                            className="btn btn-sm btn-ghost"
                                            aria-label="Edit log"
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable;