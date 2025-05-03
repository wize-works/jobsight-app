'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchLogById } from '@/services/logs';
import { useToast } from '@/hooks/use-toast';

// Components for the detail view
import LogHeader from '../components/LogHeader';
import LogCard from '../components/LogCard';
import LogApproval from '../components/log-approval';
import LogActions from '../components/log-actions';

export default function LogDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [log, setLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLog = async () => {
            try {
                setLoading(true);
                const logData = await fetchLogById(id);
                setLog(logData);
                setError(null);
            } catch (err) {
                console.error('Error loading log:', err);
                setError('Failed to load log details. The log may have been deleted or you may not have permission to view it.');
                toast({
                    title: 'Error',
                    description: 'Failed to load log details',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadLog();
        }
    }, [id, toast]);

    const handleEdit = () => {
        router.push(`/logs/${id}/edit`);
    };

    const handleDelete = async () => {
        // Confirmation logic will be implemented in LogActions component
        router.push('/logs');
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4 max-w-5xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Loading Log Details...</h1>
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
                    <Link href="/logs" className="btn btn-outline">
                        Back to Logs
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

    if (!log) {
        return null;
    }

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* Back button and header */}
            <div className="flex justify-between items-center mb-6">
                <Link href="/logs" className="btn btn-outline btn-sm">
                    ← Back to Logs
                </Link>
                <h1 className="text-2xl font-bold">Daily Log Details</h1>
                <div className="flex space-x-2">
                    <LogActions log={log} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>

            {/* Log header component - displays project, date, author, approval status */}
            <LogHeader log={log} className="mb-6" />

            {/* Log approval component */}
            <LogApproval log={log} className="mb-6" />

            {/* Log details component - displays all log information */}
            <LogCard log={log} />
        </div>
    );
}