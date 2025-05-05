'use client';

export const ProjectOverviewTab = ({ project, formatDate }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-base-content/60">Client</p>
                                <p className="font-medium">{project?.client || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-base-content/60">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className={`status ${project?.status === 'active' ? 'status-info' :
                                        project?.status === 'completed' ? 'status-success' :
                                            project?.status === 'on hold' ? 'status-warning' :
                                                project?.status === 'planning' ? 'status-primary' :
                                                    'status-neutral'
                                        }`}></span>
                                    <span className="capitalize">{project?.status?.replace(/_/g, ' ') || 'Unknown'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-base-content/60">Start Date</p>
                                <p>{formatDate(project?.startDate)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-base-content/60">Due Date</p>
                                <p>{formatDate(project?.endDate)}</p>
                            </div>
                        </div>

                        {project?.location && (
                            <div>
                                <p className="text-sm text-base-content/60">Location</p>
                                <p>{project.location}</p>
                            </div>
                        )}

                        {project?.budget && (
                            <div>
                                <p className="text-sm text-base-content/60">Budget</p>
                                <p>${parseFloat(project.budget).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h3 className="text-lg font-semibold mb-4">Progress Tracking</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-base-content/70">Completion</span>
                                <span className="text-sm font-medium">{project?.progress || project?.completion || 0}%</span>
                            </div>
                            <div className="w-full bg-base-200 rounded-full h-2.5">
                                <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{ width: `${project?.progress || project?.completion || 0}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-base font-semibold mb-2">Project Stats</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-base-200 p-3 rounded-lg">
                                    <p className="text-sm text-base-content/70">Tasks</p>
                                    <p className="text-xl font-bold">0</p>
                                </div>
                                <div className="bg-base-200 p-3 rounded-lg">
                                    <p className="text-sm text-base-content/70">Completed</p>
                                    <p className="text-xl font-bold">0</p>
                                </div>
                                <div className="bg-base-200 p-3 rounded-lg">
                                    <p className="text-sm text-base-content/70">Daily Logs</p>
                                    <p className="text-xl font-bold">0</p>
                                </div>
                                <div className="bg-base-200 p-3 rounded-lg">
                                    <p className="text-sm text-base-content/70">Team Members</p>
                                    <p className="text-xl font-bold">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {(project?.description || project?.notes) && (
                <div className="card bg-base-100 shadow-md lg:col-span-2">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold mb-4">Description & Notes</h3>

                        {project?.description && (
                            <div className="mb-4">
                                <p className="text-sm text-base-content/60 mb-1">Description</p>
                                <p className="whitespace-pre-line">{project.description}</p>
                            </div>
                        )}

                        {project?.notes && (
                            <div>
                                <p className="text-sm text-base-content/60 mb-1">Notes</p>
                                <p className="whitespace-pre-line">{project.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectOverviewTab;