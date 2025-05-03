import React from 'react';
import Link from 'next/link';

const TeamMemberProjects = ({ projects = [], loading = false }) => {
    if (loading) {
        return (
            <div className="bg-base-100 rounded-lg shadow-md p-6">
                <div className="h-6 bg-base-300 rounded w-32 mb-4 animate-pulse"></div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-5 bg-base-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-base-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress': return 'status-info';
            case 'completed': return 'status-success';
            case 'pending': return 'status-warning';
            case 'planning': return 'status-primary';
            case 'archived': return 'status-neutral';
            default: return 'status-neutral';
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Projects ({projects.length})</h2>
                {projects.length > 0 && (
                    <span className="badge badge-outline badge-sm">
                        {projects.filter(p => p.status === 'in_progress').length} active
                    </span>
                )}
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                    <i className="fas fa-project-diagram text-2xl mb-2"></i>
                    <p>No projects assigned</p>
                </div>
            ) : (
                <div className="divide-y divide-base-200">
                    {projects.map((project) => (
                        <Link
                            href={`/projects/${project._id}`}
                            key={project._id}
                            className="py-3 block hover:bg-base-200 transition-colors rounded-md px-2 -mx-2"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-primary-focus hover:text-primary transition-colors">
                                    {project.name}
                                </h3>
                                <div className="flex items-center">
                                    <span className={`status ${getStatusColor(project.status)}`}></span>
                                    <span className="text-xs ml-1 capitalize">
                                        {project.status ? project.status.replace(/_/g, ' ') : 'Unknown'}
                                    </span>
                                </div>
                            </div>

                            <div className="text-xs text-base-content/70 mb-2">
                                <i className="fas fa-building mr-1"></i> {project.client || 'No client'}
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{project.completion || 0}%</span>
                                </div>
                                <progress
                                    className="progress progress-primary w-full h-1.5"
                                    value={project.completion || 0}
                                    max="100"
                                ></progress>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamMemberProjects;