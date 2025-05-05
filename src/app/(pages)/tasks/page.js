'use client';
import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { fetchTasks, updateTask } from '@/app/services/task';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskStatsSummary from './components/TaskStatsSummary';
import TaskCard from './components/TaskCard';

// Wrap the entire component with memo to prevent unnecessary re-renders
const TasksPage = memo(() => {
    console.log("TasksPage - Component rendering");
    const router = useRouter();
    const { toast } = useToast();

    // Use a ref to store tasks to prevent state updates triggering re-renders
    const tasksRef = useRef([]);

    // Only use state for values that should trigger UI updates
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [priority, setPriority] = useState('all');
    const [status, setStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('dueDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const [refreshFlag, setRefreshFlag] = useState(0);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'

    // Control flags stored as refs to avoid re-renders
    const mountedRef = useRef(false);
    const loadingRef = useRef(false);
    const lastLoadTimeRef = useRef(0);

    // Filtering and sorting function
    const filterAndSortTasks = useCallback(() => {
        if (!tasksRef.current?.length) return [];

        console.log("TasksPage - Filtering and sorting tasks");
        let results = [...tasksRef.current];

        // Filter by priority
        if (priority !== 'all') {
            results = results.filter(task =>
                task.priority?.toLowerCase() === priority.toLowerCase()
            );
        }

        // Filter by status
        if (status !== 'all') {
            results = results.filter(task =>
                task.status?.toLowerCase() === status.toLowerCase()
            );
        }

        // Filter by search term
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            results = results.filter(task =>
                task.title.toLowerCase().includes(lowercasedTerm) ||
                (task.description && task.description.toLowerCase().includes(lowercasedTerm)) ||
                (task.projectName && task.projectName.toLowerCase().includes(lowercasedTerm)) ||
                (task.assignedToName && task.assignedToName.toLowerCase().includes(lowercasedTerm)) ||
                (task.tags && task.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)))
            );
        }

        // Sort tasks
        results.sort((a, b) => {
            if (sortBy === 'dueDate') {
                const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
                const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (sortBy === 'priority') {
                const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3, none: 4 };
                const priorityA = priorityOrder[a.priority?.toLowerCase()] ?? 999;
                const priorityB = priorityOrder[b.priority?.toLowerCase()] ?? 999;
                return sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
            } else if (sortBy === 'title') {
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });

        console.log("TasksPage - Setting filtered tasks:", results.length);
        return results;
    }, [priority, status, searchTerm, sortBy, sortOrder]);

    // Load tasks function with debounce protection
    const loadTasks = useCallback(async (force = false) => {
        // Prevent multiple simultaneous loads
        if (loadingRef.current) {
            console.log("TasksPage - Already loading tasks, skipping");
            return;
        }

        // Don't reload too frequently unless forced
        const now = Date.now();
        if (!force && now - lastLoadTimeRef.current < 2000) {
            console.log("TasksPage - Throttling task reload, too frequent");
            return;
        }

        try {
            loadingRef.current = true;
            setIsLoading(true);
            console.log("TasksPage - Loading tasks...");

            const data = await fetchTasks();
            console.log("TasksPage - Tasks loaded:", data.length);

            tasksRef.current = data;
            lastLoadTimeRef.current = Date.now();

            // Update the filtered tasks
            setFilteredTasks(filterAndSortTasks());
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            toast({
                title: "Error",
                description: "Failed to load tasks",
                variant: "destructive",
            });
            setIsLoading(false);
        } finally {
            loadingRef.current = false;
        }
    }, [filterAndSortTasks, toast]);

    // Initial load on mount - once only
    useEffect(() => {
        if (!mountedRef.current) {
            console.log("TasksPage - Initial mount, loading tasks");
            mountedRef.current = true;
            loadTasks(true);
        }
        // No dependencies to prevent reloading
    }, []);

    // Handle explicit refresh requests
    useEffect(() => {
        if (mountedRef.current && refreshFlag > 0) {
            console.log("TasksPage - Refresh flag changed, reloading tasks");
            loadTasks(true);
        }
    }, [refreshFlag, loadTasks]);

    // Update filtered tasks when filter criteria change
    useEffect(() => {
        if (tasksRef.current?.length) {
            setFilteredTasks(filterAndSortTasks());
        }
    }, [filterAndSortTasks]);

    // Task action handlers
    const handleAddTask = useCallback(() => {
        router.push('/tasks/new');
    }, [router]);

    const handleTaskClick = useCallback((taskId) => {
        router.push(`/tasks/${taskId}`);
    }, [router]);

    const handleMarkComplete = useCallback(async (taskId) => {
        try {
            console.log("TasksPage - Marking task complete:", taskId);
            await updateTask(taskId, { status: 'completed' });

            // Update the task in the internal tasksRef to avoid full reload
            const taskIndex = tasksRef.current.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasksRef.current[taskIndex] = {
                    ...tasksRef.current[taskIndex],
                    status: 'completed'
                };
            }

            // Update filtered tasks without a full reload
            setFilteredTasks(filterAndSortTasks());

            toast({
                title: 'Success',
                description: 'Task marked as completed',
            });
        } catch (error) {
            console.error("Error updating task:", error);
            toast({
                title: 'Error',
                description: 'Failed to update task status',
                variant: 'destructive',
            });

            // Force reload only on error
            setRefreshFlag(prev => prev + 1);
        }
    }, [filterAndSortTasks, toast]);

    const handleToggleSort = useCallback((field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    }, [sortBy]);

    // Render the task cards in a grid
    const renderTaskCards = useCallback(() => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="card bg-base-100 shadow-md animate-pulse">
                            <div className="card-body p-5">
                                <div className="flex justify-between">
                                    <div className="h-6 bg-base-300 rounded w-3/4 mb-3"></div>
                                    <div className="h-4 bg-base-300 rounded w-16"></div>
                                </div>
                                <div className="h-4 bg-base-300 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-base-300 rounded w-full mb-3"></div>
                                <div className="flex justify-between mt-2">
                                    <div className="h-3 bg-base-300 rounded w-1/4"></div>
                                    <div className="h-3 bg-base-300 rounded w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (filteredTasks.length === 0) {
            return (
                <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
                    <div className="text-5xl text-base-content/20 mb-4">
                        <i className="fas fa-tasks"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                    <p className="text-base-content/60 mb-6">There are no tasks matching your current filters</p>
                    <button
                        onClick={handleAddTask}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Create New Task
                    </button>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task) => {
                    // Get priority color for left border
                    const getPriorityBorderColor = (priority) => {
                        switch (priority?.toLowerCase()) {
                            case 'urgent': return 'border-error';
                            case 'high': return 'border-warning';
                            case 'normal': return 'border-info';
                            case 'low': return 'border-success';
                            default: return 'border-primary';
                        }
                    };

                    // Get status badge color
                    const getStatusBadge = (status) => {
                        const statusColors = {
                            pending: 'bg-info/20 text-info',
                            in_progress: 'bg-primary/20 text-primary',
                            completed: 'bg-success/20 text-success',
                            on_hold: 'bg-warning/20 text-warning',
                            cancelled: 'bg-error/20 text-error'
                        };

                        const colorClass = statusColors[status?.toLowerCase()] || 'bg-base-200 text-base-content';
                        const displayStatus = status?.replace(/_/g, ' ') || 'Unknown';

                        return (
                            <span className={`badge ${colorClass} capitalize text-xs px-2 py-1 rounded-md`}>
                                {displayStatus}
                            </span>
                        );
                    };

                    // Format due date
                    const formatDueDate = (dateString) => {
                        if (!dateString) return 'No due date';
                        const date = new Date(dateString);
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                    };

                    // Check if task is overdue
                    const isOverdue = (dueDate) => {
                        if (!dueDate) return false;
                        const now = new Date();
                        const taskDue = new Date(dueDate);
                        return taskDue < now && task.status !== 'completed';
                    };

                    // Add overdue indicator
                    const overdueClass = isOverdue(task.dueDate) ? 'border-error' : '';

                    return (
                        <div
                            key={task.id}
                            onClick={() => handleTaskClick(task.id)}
                            className={`cursor-pointer transition-transform duration-300 hover:-translate-y-1 w-full mx-auto`}
                        >
                            <div className={`card bg-white shadow-md border-l-4 ${getPriorityBorderColor(task.priority)} hover:shadow-lg transition-all duration-300 h-full ${overdueClass}`}>
                                <div className="card-body p-5">
                                    <div className="flex justify-between items-start">
                                        <h2 className={`card-title text-lg font-semibold mb-1 line-clamp-1 ${task.status === 'completed' ? 'line-through text-base-content/60' : ''}`}>
                                            {task.title}
                                        </h2>
                                        {getStatusBadge(task.status)}
                                    </div>

                                    {task.projectName && (
                                        <div className="text-sm text-base-content/70 mb-2">
                                            <i className="fas fa-folder mr-1 opacity-70"></i> {task.projectName}
                                        </div>
                                    )}

                                    {task.description && (
                                        <p className="text-sm text-base-content/80 mb-3 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-2">
                                        <div className="flex justify-between items-center text-xs text-base-content/70">
                                            <div>
                                                {task.assignedToName ? (
                                                    <>
                                                        <i className="fas fa-user mr-1"></i>
                                                        <span className="truncate max-w-[120px] sm:max-w-[100px]">{task.assignedToName}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-user-slash mr-1"></i>
                                                        <span>Unassigned</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className={isOverdue(task.dueDate) ? 'text-error font-medium' : ''}>
                                                <i className="fas fa-calendar-alt mr-1"></i> {formatDueDate(task.dueDate)}
                                            </div>
                                        </div>

                                        {task.tags && task.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {task.tags.slice(0, 3).map((tag, index) => (
                                                    <span key={index} className="text-xs bg-base-200 text-base-content/70 rounded-full px-2 py-0.5">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {task.tags.length > 3 && (
                                                    <span className="text-xs bg-base-200 text-base-content/70 rounded-full px-2 py-0.5">
                                                        +{task.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Complete button */}
                                        {task.status !== 'completed' && (
                                            <div className="mt-3 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkComplete(task.id);
                                                    }}
                                                    className="btn btn-xs btn-outline btn-success"
                                                >
                                                    <i className="fas fa-check mr-1"></i> Mark Complete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, [filteredTasks, isLoading, handleAddTask, handleTaskClick, handleMarkComplete]);

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Header with title and actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Tasks</h1>
                    <button
                        onClick={handleAddTask}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-plus mr-2"></i> Add Task
                    </button>
                </div>

                {/* Tasks stats summary */}
                <TaskStatsSummary tasks={tasksRef.current} loading={isLoading} />

                {/* Filters and sorting controls */}
                <TaskFilter
                    priority={priority}
                    setPriority={setPriority}
                    status={status}
                    setStatus={setStatus}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onToggleSort={handleToggleSort}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    loading={isLoading}
                />

                {/* Tasks list or grid */}
                {viewMode === 'list' ? (
                    <TaskList
                        tasks={filteredTasks}
                        loading={isLoading}
                        onTaskClick={handleTaskClick}
                        onMarkComplete={handleMarkComplete}
                    />
                ) : (
                    renderTaskCards()
                )}
            </div>
        </main>
    );
});

TasksPage.displayName = 'TasksPage';

export default TasksPage;