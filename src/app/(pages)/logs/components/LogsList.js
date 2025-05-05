'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProjects } from '@/services/project';
import { getDailyLogs } from '@/services/log';
import LogTable from './LogTable';
import LogCard from './LogCard';

const LogsList = ({ initialLogs = [] }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State management
    const [logs, setLogs] = useState(initialLogs);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

    // Filter state
    const [filters, setFilters] = useState({
        projectId: searchParams.get('projectId') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || '',
        author: searchParams.get('author') || ''
    });

    // Load projects for filter dropdown
    useEffect(() => {
        const loadProjects = async () => {
            try {
                const projectsData = await getProjects();
                setProjects(projectsData?.data || []);
            } catch (error) {
                console.error("Error loading projects:", error);
            }
        };

        loadProjects();
    }, []);

    // Handle filter changes with debouncing
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));

        // Update URL search params
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        router.replace(`/logs?${params.toString()}`);
    };

    // Clear all filters
    const handleClearFilters = () => {
        setFilters({
            projectId: '',
            dateFrom: '',
            dateTo: '',
            author: ''
        });
        router.replace('/logs');
    };

    // Load logs with filters
    const loadFilteredLogs = useCallback(async () => {
        try {
            setIsLoading(true);

            // Convert filters to format expected by the service
            const filterOptions = {
                filter: {}
            };

            if (filters.projectId) {
                filterOptions.filter.projectId = filters.projectId;
            }

            if (filters.dateFrom || filters.dateTo) {
                filterOptions.filter.date = {};
                if (filters.dateFrom) {
                    filterOptions.filter.date.gte = new Date(filters.dateFrom);
                }
                if (filters.dateTo) {
                    filterOptions.filter.date.lte = new Date(filters.dateTo);
                }
            }

            if (filters.author) {
                filterOptions.filter.author = { contains: filters.author };
            }

            // Use the log service directly, same as how we'd use it server-side
            const logsData = await getDailyLogs(filterOptions);
            setLogs(logsData || []);
        } catch (error) {
            console.error("Error loading logs:", error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // Apply filters when they change
    useEffect(() => {
        if (filters.projectId || filters.dateFrom || filters.dateTo || filters.author) {
            loadFilteredLogs();
        } else {
            setLogs(initialLogs); // Reset to initial logs if no filters
        }
    }, [loadFilteredLogs, filters, initialLogs]);

    // Handle log navigation
    const handleViewLog = (logId) => {
        router.push(`/logs/${logId}`);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Determine approval status badge
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
                <div className="flex items-center gap-2">
                    <div className="btn-group hidden sm:flex">
                        <button
                            className={`btn ${viewMode === 'table' ? 'btn-active' : ''}`}
                            onClick={() => setViewMode('table')}
                        >
                            <i className="fas fa-list"></i>
                        </button>
                        <button
                            className={`btn ${viewMode === 'grid' ? 'btn-active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div>
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

            {/* Logs Display (Table or Grid) */}
            {isLoading ? (
                <div className="bg-base-100 rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
                    <div className="loading loading-spinner loading-lg mb-4"></div>
                    <p className="text-base-content/70">Loading logs data...</p>
                </div>
            ) : logs.length === 0 ? (
                <div className="bg-base-100 rounded-lg shadow-md p-8 text-center">
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
            ) : viewMode === 'table' ? (
                /* Table view */
                <LogTable
                    logs={logs}
                    onViewLog={handleViewLog}
                    getApprovalStatusBadge={getApprovalStatusBadge}
                    formatDate={formatDate}
                />
            ) : (
                /* Grid view */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {logs.map(log => (
                        <LogCard
                            key={log._id}
                            log={log}
                            onClick={() => handleViewLog(log._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LogsList;