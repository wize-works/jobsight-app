'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjectById } from '@/services/';

const LogTable = ({ logs, loading }) => {
    const [projectNames, setProjectNames] = useState({});
    const [loadingProjects, setLoadingProjects] = useState(true);

    // get project names for all logs when the component mounts or logs change
    useEffect(() => {
        const getProjectNames = async () => {
            if (!logs || logs.length === 0) {
                setLoadingProjects(false);
                return;
            }

            try {
                // Get unique project IDs
                const projectIds = [...new Set(logs.map(log => log.projectId))];

                // get project data for each unique project ID
                const projectData = {};
                await Promise.all(
                    projectIds.map(async (projectId) => {
                        if (projectId) {
                            const project = await getProjectById(projectId);
                            projectData[projectId] = project?.name || 'Unknown Project';
                        }
                    })
                );

                setProjectNames(projectData);
            } catch (error) {
                console.error('Error geting project names:', error);
            } finally {
                setLoadingProjects(false);
            }
        };

        if (logs && logs.length > 0) {
            setLoadingProjects(true);
            getProjectNames();
        } else {
            setLoadingProjects(false);
        }
    }, [logs]);

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
        <div className="overflow-x-auto card bg-base-100 shadow-md">
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
                                    {loadingProjects ? (
                                        <span className="loading loading-spinner loading-xs"></span>
                                    ) : (
                                        <Link href={`/projects/${log.projectId}`} className="hover:text-primary transition-colors">
                                            {projectNames[log.projectId] || 'Unnamed Project'}
                                        </Link>
                                    )}
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