'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProjectCard from './card';

const ProjectsList = ({ initialProjects }) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [projects] = useState(initialProjects || []);

    // Filter projects based on status and search term
    const filteredProjects = projects.filter(project => {
        // Filter by status
        if (statusFilter !== 'all' && project.status !== statusFilter) {
            return false;
        }

        // Filter by search term
        if (searchTerm && !project.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !project.client?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !project.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        return true;
    });

    const handleCreateProject = () => {
        router.push('/projects/new');
    };

    // Status options for filter dropdown
    const statusOptions = [
        { value: 'all', label: 'All Projects' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' },
        { value: 'on hold', label: 'On Hold' },
        { value: 'planning', label: 'Planning' },
        { value: 'archived', label: 'Archived' }
    ];

    return (
        <div className="animate-fadeIn">
            {/* Header with title and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
                <button
                    onClick={handleCreateProject}
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus mr-2"></i> New Project
                </button>
            </div>

            {/* Filters and view options */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-base-100 p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Search input */}
                    <div className="form-control w-full sm:w-64">
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                type="search"
                                required
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* Status filter */}
                    <select
                        className="select select-bordered w-full sm:w-auto"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* View toggle */}
                <div className="btn-group">
                    <button
                        className={`btn ${viewMode === 'grid' ? 'btn-active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <i className="fas fa-th-large"></i>
                    </button>
                    <button
                        className={`btn ${viewMode === 'table' ? 'btn-active' : ''}`}
                        onClick={() => setViewMode('table')}
                    >
                        <i className="fas fa-list"></i>
                    </button>
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                // Empty state
                <div className="text-center py-12 bg-base-100 rounded-lg shadow-md">
                    <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                        <i className="fas fa-folder-open text-2xl text-base-content/50"></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                    <p className="text-base-content/60 mb-6">
                        {searchTerm || statusFilter !== 'all'
                            ? "Try adjusting your filters or search term"
                            : "Create your first project to get started"}
                    </p>
                    <button
                        onClick={handleCreateProject}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-plus mr-2"></i> New Project
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                // Grid view
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 place-content-center">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project._id || index} project={project} />
                    ))}
                </div>
            ) : (
                // Table view
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap">Project</th>
                                        <th className="hidden sm:table-cell whitespace-nowrap">Client</th>
                                        <th className="whitespace-nowrap">Status</th>
                                        <th className="hidden md:table-cell whitespace-nowrap">Progress</th>
                                        <th className="hidden lg:table-cell whitespace-nowrap">Due Date</th>
                                        <th className="whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProjects.map((project, index) => (
                                        <tr key={project._id || index} className="hover:bg-base-200 hover:shadow-md transition-colors duration-200">
                                            <td className="font-medium">
                                                <Link href={`/projects/${project._id}`} className="hover:text-primary transition-colors">
                                                    {project.name || 'Untitled Project'}
                                                </Link>
                                            </td>
                                            <td className="hidden sm:table-cell">{project.client}</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`status ${project.status === 'active' ? 'status-info' :
                                                            project.status === 'completed' ? 'status-success' :
                                                                project.status === 'on hold' ? 'status-warning' :
                                                                    project.status === 'planning' ? 'status-primary' :
                                                                        project.status === 'archived' ? 'status-neutral' :
                                                                            'status-neutral'
                                                            }`}
                                                    ></span>
                                                    <span className="capitalize">{project.status ? project.status.replace(/_/g, ' ') : 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <progress
                                                        className="progress progress-primary w-24"
                                                        value={project.progress || project.completion || 0}
                                                        max="100"
                                                    ></progress>
                                                    <span className="text-sm">{project.progress || project.completion || 0}%</span>
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell whitespace-nowrap">
                                                {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/projects/${project._id}`}
                                                        className="btn btn-sm btn-ghost"
                                                        aria-label="View project"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-ghost"
                                                        aria-label="Edit project"
                                                        onClick={() => router.push(`/projects/${project._id}/edit`)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsList;