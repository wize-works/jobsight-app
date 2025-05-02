import React from 'react';
import PropTypes from 'prop-types';

const ProjectsTable = ({ projects, loading }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">Project</th>
                        <th className="hidden sm:table-cell whitespace-nowrap">Client</th>
                        <th className="whitespace-nowrap">Status</th>
                        <th className="hidden md:table-cell whitespace-nowrap">Progress</th>
                        <th className="hidden lg:table-cell whitespace-nowrap">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center p-4">Loading...</td>
                        </tr>
                    ) : (
                        projects.map((project, index) => (
                            <tr key={index} className="hover:bg-base-200 hover:shadow-md transition-colors duration-200">
                                <td className="font-medium">{project.name}</td>
                                <td className="hidden sm:table-cell">{project.client}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`status ${project.status === 'active' ? 'status-info' :
                                                project.status === 'completed' ? 'status-success' :
                                                    project.status === 'on hold' ? 'status-warning' :
                                                        project.status === 'planning' ? 'status-primary' :
                                                            'status-neutral'
                                                }`}
                                        ></span>
                                        <span className="capitalize">{project.status}</span>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <progress className="progress progress-primary w-24" value={project.completion} max="100"></progress>
                                        <span className="text-sm">{project.completion}%</span>
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell whitespace-nowrap">{new Date(project.dueDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ProjectsTable;