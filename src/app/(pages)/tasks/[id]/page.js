'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchTaskById, updateTask } from '@/services/task';
import { useToast } from '@/hooks/use-toast';

// Components for the task detail view
import TaskHeader from '../components/TaskHeader';
import TaskDetails from '../components/TaskDetails';
import TaskComments from '../components/TaskComments';
import TaskActions from '../components/TaskActions';

export default function TaskDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTask = async () => {
            try {
                setLoading(true);
                const taskData = await fetchTaskById(id);
                setTask(taskData);
                setError(null);
            } catch (err) {
                console.error('Error loading task:', err);
                setError('Failed to load task details. The task may have been deleted or you may not have permission to view it.');
                toast({
                    title: 'Error',
                    description: 'Failed to load task details',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadTask();
        }
    }, [id, toast]);

    const handleEdit = () => {
        router.push(`/tasks/${id}/edit`);
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await updateTask(id, { status: newStatus });

            // Update local state
            setTask(prev => ({ ...prev, status: newStatus }));

            toast({
                title: 'Status updated',
                description: `Task status changed to ${newStatus.replace('_', ' ')}`,
            });
        } catch (err) {
            console.error('Error updating task status:', err);
            toast({
                title: 'Error',
                description: 'Failed to update task status',
                variant: 'destructive',
            });
        }
    };

    const handleDelete = async () => {
        // Actual delete functionality will be implemented in TaskActions component
        router.push('/tasks');
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 max-w-5xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Loading Task Details...</h1>
                </div>
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 max-w-5xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Error</h1>
                    <Link href="/tasks" className="btn btn-outline">
                        Back to Tasks
                    </Link>
                </div>
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (!task) {
        return null;
    }

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* Back button and header */}
            <div className="flex justify-between items-center mb-6">
                <Link href="/tasks" className="btn btn-outline btn-sm">
                    ← Back to Tasks
                </Link>
                <h1 className="text-2xl font-bold">Task Details</h1>
                <div className="flex space-x-2">
                    <TaskActions
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            </div>

            {/* Task header component - displays title, due date, status, and priority */}
            <TaskHeader task={task} className="mb-6" />

            {/* Task details component - displays all task information */}
            <TaskDetails task={task} className="mb-6" />

            {/* Task comments and activity logs */}
            <TaskComments taskId={id} comments={task.comments || []} />
        </div>
    );
}