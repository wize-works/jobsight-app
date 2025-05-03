'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchLogById, updateLog } from '@/services';
import { useToast } from '@/hooks/use-toast';
import LogForm from '../../components/LogForm';

const EditLog = ({ params }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [log, setLog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadLog = async () => {
            try {
                const data = await fetchLogById(params.id);
                setLog(data);
            } catch (error) {
                console.error("Error fetching log:", error);
                toast({
                    title: "Error",
                    description: "Failed to load log details for editing",
                    variant: "destructive",
                });
                router.push('/logs');
            } finally {
                setIsLoading(false);
            }
        };

        loadLog();
    }, [params.id, router, toast]);

    const handleSubmit = async (logData) => {
        setIsSubmitting(true);
        try {
            await updateLog(params.id, logData);
            return true;
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 bg-base-300 rounded animate-pulse w-24"></div>
                    <div className="h-8 bg-base-300 rounded animate-pulse w-32"></div>
                </div>
                <div className="mb-6">
                    <div className="h-10 bg-base-300 rounded animate-pulse w-1/3 mb-2"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse w-1/2"></div>
                </div>
                <div className="bg-base-100 rounded-lg shadow-md p-6">
                    <div className="h-8 bg-base-300 rounded animate-pulse w-3/4 mb-4"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse w-full mb-3"></div>
                    <div className="h-4 bg-base-300 rounded animate-pulse w-5/6 mb-3"></div>
                </div>
            </main>
        );
    }

    if (!log) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                        <i className="fas fa-exclamation-triangle text-2xl text-warning"></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Log Not Found</h3>
                    <p className="text-base-content/60 mb-6">
                        The log you&apos;re trying to edit doesn&apos;t exist or has been deleted.
                    </p>
                    <Link href="/logs" className="btn btn-primary">
                        Back to Logs
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
                        <li><Link href="/logs">Logs</Link></li>
                        <li><Link href={`/logs/${params.id}`}>Log Details</Link></li>
                        <li className="text-base-content/70">Edit</li>
                    </ul>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Edit Log</h1>
                    <p className="text-base-content/70">Update log details, tasks, personnel, and other information.</p>
                </div>

                {/* Form */}
                <LogForm
                    log={log}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    isEdit={true}
                />
            </div>
        </main>
    );
};

export default EditLog;