'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { fetchProjects } from '@/services';

const ProjectDetail = ({ params }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const loadProject = async () => {
            try {
                // In a real app, this would fetch the specific project by ID
                // For now, we'll fetch all projects and find the one with matching ID
                const allProjects = await fetchProjects();
                const foundProject = allProjects.find(p => p._id === params.id || p.id === params.id);

                if (foundProject) {
                    setProject(foundProject);
                } else {
                    toast({
                        title: "Project Not Found",
                        description: "The requested project could not be found.",
                        variant: "destructive",
                    });
                    router.push('/projects');
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
                toast({
                    title: "Error",
                    description: "Failed to load project details.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadProject();
    }, [params.id, router, toast]);

    // Format date strings
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        router.push(`/projects/${params.id}/edit`);
    };

    const handleDelete = async () => {
        // This is where you would handle project deletion
        // For now, we'll just show a confirmation dialog
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                // API call would go here
                // await deleteProject(params.id);
                toast({
                    title: "Project Deleted",
                    description: "The project has been successfully deleted.",
                });
                router.push('/projects');
            } catch (error) {
                console.error("Error deleting project:", error);
                toast({
                    title: "Error",
                    description: "Failed to delete project.",
                    variant: "destructive",
                });
            }
        }
    };

    // Define tab content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
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
            case 'tasks':
                return (
                    <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                            <i className="fas fa-tasks text-2xl text-base-content/50"></i>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Tasks Coming Soon</h3>
                        <p className="text-base-content/60 mb-6">
                            This feature is under development and will be available soon.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => alert('Task management is coming soon!')}
                        >
                            Learn More
                        </button>
                    </div>
                );
            case 'logs':
                return (
                    <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                            <i className="fas fa-clipboard-list text-2xl text-base-content/50"></i>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Logs Coming Soon</h3>
                        <p className="text-base-content/60 mb-6">
                            Daily logs and activity tracking will be available in the next update.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => alert('Log management is coming soon!')}
                        >
                            Learn More
                        </button>
                    </div>
                );
            case 'invoices':
                return (
                    <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                            <i className="fas fa-file-invoice-dollar text-2xl text-base-content/50"></i>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Invoices Coming Soon</h3>
                        <p className="text-base-content/60 mb-6">
                            Invoice generation and tracking will be available in the next update.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => alert('Invoice management is coming soon!')}
                        >
                            Learn More
                        </button>
                    </div>
                );
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    if (isLoading) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 bg-base-300 rounded animate-pulse w-24"></div>
                    <div className="h-8 bg-base-300 rounded animate-pulse w-32"></div>
                </div>
                <div className="bg-base-100 rounded-lg shadow-md p-6">
                    <div className="h-8 bg-base-300 rounded animate-pulse w-3/4 mb-4"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse w-1/2 mb-3"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse w-full mb-3"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse w-5/6 mb-6"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-64 bg-base-300 rounded animate-pulse"></div>
                        <div className="h-64 bg-base-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                        <i className="fas fa-exclamation-triangle text-2xl text-warning"></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Project Not Found</h3>
                    <p className="text-base-content/60 mb-6">
                        The project you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link href="/projects" className="btn btn-primary">
                        Back to Projects
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li className="text-base-content/70">{project.name}</li>
                    </ul>
                </div>

                {/* Project Header */}
                <div className="bg-base-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-1">{project.name}</h1>
                            {project.client && (
                                <p className="text-base-content/70">
                                    <i className="fas fa-building mr-1 opacity-70"></i> {project.client}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={handleEdit}
                            >
                                <i className="fas fa-edit mr-1"></i> Edit
                            </button>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-sm">
                                    <i className="fas fa-ellipsis-v"></i>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={() => alert('Share functionality coming soon!')}><i className="fas fa-share-alt mr-2"></i> Share</a></li>
                                    <li><a onClick={() => alert('Export functionality coming soon!')}><i className="fas fa-download mr-2"></i> Export</a></li>
                                    <li><a onClick={() => alert('Duplicate functionality coming soon!')}><i className="fas fa-copy mr-2"></i> Duplicate</a></li>
                                    <li><a onClick={() => alert('Archive functionality coming soon!')}><i className="fas fa-archive mr-2"></i> Archive</a></li>
                                    <li className="text-error"><a onClick={handleDelete}><i className="fas fa-trash-alt mr-2"></i> Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs tabs-boxed mb-6 bg-base-100 p-1 shadow-md">
                    <a
                        className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </a>
                    <a
                        className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        Tasks
                    </a>
                    <a
                        className={`tab ${activeTab === 'logs' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('logs')}
                    >
                        Logs
                    </a>
                    <a
                        className={`tab ${activeTab === 'invoices' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('invoices')}
                    >
                        Invoices
                    </a>
                </div>

                {/* Tab Content */}
                {renderTabContent()}
            </div>
        </main>
    );
};

export default ProjectDetail;