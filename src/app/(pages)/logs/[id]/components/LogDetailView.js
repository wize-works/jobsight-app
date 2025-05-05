'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { deleteDailyLog } from '@/services/log';

// Import components for the detail view
import LogHeader from '../../components/LogHeader';
import LogCard from '../../components/LogCard';
import LogApproval from '../../components/log-approval';
import LogActions from '../../components/log-actions';

export default function LogDetailView({ log }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = () => {
        router.push(`/logs/${log._id}/edit`);
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this log? This action cannot be undone.")) {
            try {
                setIsDeleting(true);
                await deleteDailyLog(log._id);
                toast({
                    title: "Success",
                    description: "Log has been deleted successfully",
                    variant: "success",
                });
                router.push('/logs');
                router.refresh();
            } catch (error) {
                console.error('Error deleting log:', error);
                toast({
                    title: "Error",
                    description: "Failed to delete the log",
                    variant: "destructive",
                });
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="animate-fadeIn">
            {/* Breadcrumbs and actions */}
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/logs">Logs</Link></li>
                    <li className="text-base-content/70">Log Details</li>
                </ul>
            </div>

            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Daily Log Details</h1>
                <div className="flex space-x-2">
                    <button onClick={() => router.push('/logs')} className="btn btn-outline btn-sm">
                        <i className="fas fa-arrow-left mr-2"></i> Back
                    </button>
                    <button
                        onClick={handleEdit}
                        className="btn btn-outline btn-sm"
                    >
                        <i className="fas fa-edit mr-2"></i> Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-error btn-sm"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <span className="loading loading-spinner loading-xs mr-2"></span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-trash-alt mr-2"></i> Delete
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Log header component - displays project, date, author, approval status */}
            <LogHeader log={log} className="mb-6" />

            {/* Log approval component */}
            <LogApproval log={log} className="mb-6" />

            {/* Log details component - displays all log information */}
            <LogCard log={log} detailed={true} />
        </div>
    );
}