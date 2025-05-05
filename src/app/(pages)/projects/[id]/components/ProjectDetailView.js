'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import ProjectOverviewTab from './ProjectOverviewTab';
import ProjectTabContent from './ProjectTabContent';

export const ProjectDetailView = ({ project }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('overview');

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
        router.push(`/projects/${project._id}/edit`);
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
                return <ProjectOverviewTab project={project} formatDate={formatDate} />;
            case 'tasks':
            case 'logs':
            case 'invoices':
                return <ProjectTabContent type={activeTab} />;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    return (
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
    );
};

export default ProjectDetailView;