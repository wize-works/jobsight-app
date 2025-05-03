'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { fetchTasks, updateTask } from '@/services/task';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskStatsSummary from './components/TaskStatsSummary';

const TasksPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [priority, setPriority] = useState('all');
    const [status, setStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority', 'title'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTasks();
                setTasks(data);
                setFilteredTasks(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                toast({
                    title: "Error",
                    description: "Failed to load tasks",
                    variant: "destructive",
                });
                setIsLoading(false);
            }
        };

        loadTasks();
    }, [toast]);

    // Filter and sort tasks based on user selection
    useEffect(() => {
        let results = [...tasks];

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

        setFilteredTasks(results);
    }, [tasks, priority, status, searchTerm, sortBy, sortOrder]);

    const handleAddTask = () => {
        router.push('/tasks/new');
    };

    const handleTaskClick = (taskId) => {
        router.push(`/tasks/${taskId}`);
    };

    const handleMarkComplete = async (taskId) => {
        try {
            await updateTask(taskId, { status: 'completed' });

            // Update the task in the local state
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, status: 'completed' } : task
            );

            setTasks(updatedTasks);

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
        }
    };

    const handleToggleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

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
                <TaskStatsSummary tasks={tasks} loading={isLoading} />

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
                    loading={isLoading}
                />

                {/* Tasks list */}
                <TaskList
                    tasks={filteredTasks}
                    loading={isLoading}
                    onTaskClick={handleTaskClick}
                    onMarkComplete={handleMarkComplete}
                />
            </div>
        </main>
    );
};

export default TasksPage;