'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchLogs, fetchProjects } from '@/services';
import { useToast } from '@/hooks/use-toast';

// Loading component for Suspense fallback
const LogsLoading = () => (
    <div className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
        <div className="p-8 flex flex-col items-center justify-center bg-base-100 rounded-lg shadow-md">
            <div className="loading loading-spinner loading-lg mb-4"></div>
            <p className="text-base-content/70">Loading logs...</p>
        </div>
    </div>
);

// Main component that uses useSearchParams
const LogsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [logs, setLogs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        projectId: searchParams.get('projectId') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || '',
        author: searchParams.get('author') || ''
    });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    // Debounce filter changes
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(timerId);
        };
    }, [filters]);

    // Load logs with debounced filters
    useEffect(() => {
        const loadLogs = async () => {
            try {
                setIsLoading(true);
                const logsData = await fetchLogs(debouncedFilters);
                setLogs(logsData);
            } catch (error) {
                console.error("Error loading logs:", error);
                toast({
                    title: "Error",
                    description: "Failed to load logs data",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadLogs();
    }, [debouncedFilters, toast]);

    // Load projects for filter dropdown
    useEffect(() => {
        const loadProjects = async () => {
            try {
                const projectsData = await fetchProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error("Error loading projects:", error);
            }
        };

        loadProjects();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            projectId: '',
            dateFrom: '',
            dateTo: '',
            author: ''
        });
    };

    const handleViewLog = (logId) => {
        router.push(`/logs/${logId}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getApprovalStatusBadge = (log) => {
        if (!log.approvals?.requested) {
            return <span className="badge badge-ghost">Not Submitted</span>;
        } else if (log.approvals?.approved) {
            return <span className="badge badge-success">Approved</span>;
        } else {
            return <span className="badge badge-warning">Pending</span>;
        }
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li className="text-base-content/70">Logs</li>
                    </ul>
                </div>

                {/* Header with Action Button */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Daily Logs</h1>
                        <p className="text-base-content/70">Track daily activities, materials, and personnel across all projects.</p>
                    </div>
                    <div>
                        <Link href="/logs/new" className="btn btn-primary">
                            <i className="fas fa-plus mr-2"></i> New Log
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-base-100 rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Project</span>
                            </label>
                            <select
                                name="projectId"
                                value={filters.projectId}
                                onChange={handleFilterChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">All Projects</option>
                                {projects.map(project => (
                                    <option key={project._id} value={project._id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Date From</span>
                            </label>
                            <input
                                type="date"
                                name="dateFrom"
                                value={filters.dateFrom}
                                onChange={handleFilterChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Date To</span>
                            </label>
                            <input
                                type="date"
                                name="dateTo"
                                value={filters.dateTo}
                                onChange={handleFilterChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
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
                                    name="author"
                                    value={filters.author}
                                    onChange={handleFilterChange}
                                    placeholder="Search by author name"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            className="btn btn-outline btn-sm"
                            onClick={handleClearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 flex flex-col items-center justify-center">
                            <div className="loading loading-spinner loading-lg mb-4"></div>
                            <p className="text-base-content/70">Loading logs data...</p>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                                <i className="fas fa-book text-2xl text-base-content/50"></i>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No Logs Found</h3>
                            <p className="text-base-content/60 mb-6 max-w-md mx-auto">
                                {Object.values(filters).some(v => v !== '')
                                    ? "No logs match your current filters. Try adjusting your search criteria."
                                    : "There are no logs recorded yet. Start by creating a new log entry."}
                            </p>
                            <Link href="/logs/new" className="btn btn-primary">
                                Create New Log
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Project</th>
                                        <th>Summary</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                        <th className="w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map(log => (
                                        <tr
                                            key={log._id}
                                            className="hover:bg-base-200 cursor-pointer"
                                            onClick={() => handleViewLog(log._id)}
                                        >
                                            <td className="font-medium">{formatDate(log.date)}</td>
                                            <td>{log.projectName}</td>
                                            <td className="max-w-xs truncate">{log.summary}</td>
                                            <td>{log.author}</td>
                                            <td>{getApprovalStatusBadge(log)}</td>
                                            <td className="flex gap-1">
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/logs/${log._id}`);
                                                    }}
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/logs/${log._id}/edit`);
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

// Wrap the main component in Suspense
const LogsPage = () => {
    return (
        <Suspense fallback={<LogsLoading />}>
            <LogsContent />
        </Suspense>
    );
};

export default LogsPage;