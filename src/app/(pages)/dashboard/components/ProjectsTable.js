import React from 'react';
import PropTypes from 'prop-types';

const ProjectsTable = ({ projects, loading }) => {
    return (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-4 bg-base-200 rounded-t-lg">
                <h2 className="text-lg font-semibold">Recent Projects</h2>
                <button className="btn btn-primary btn-sm" onClick={() => alert('Add new project functionality here!')}>Add New Project</button>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="">Project</th>
                        <th className="">Client</th>
                        <th className="">Status</th>
                        <th className="">Progress</th>
                        <th className="">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    ) : (
                        projects.map((project, index) => (
                            <tr key={index} className="hover:bg-base-200 hover:shadow-md">
                                <td>{project.name}</td>
                                <td>{project.client}</td>
                                <td>
                                    <div className={`badge ${project.status === 'active' ? 'badge-success' :
                                        project.status === 'completed' ? 'badge-primary' :
                                            project.status === 'on hold' ? 'badge-warning' :
                                                project.status === 'planning' ? 'badge-info' :
                                                    'badge-ghost'
                                        }`}>
                                        {project.status}
                                    </div>
                                </td>
                                <td>
                                    <progress className="progress progress-primary w-24" value={project.completion} max="100"></progress>
                                </td>
                                <td>{new Date(project.dueDate).toLocaleDateString()}</td>
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