'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createLog } from '@/services';
import { useToast } from '@/hooks/use-toast';
import LogForm from '../components/LogForm';

const NewLogPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (logData) => {
        try {
            setIsSubmitting(true);

            // Add created timestamp
            const enrichedLogData = {
                ...logData,
                createdAt: new Date().toISOString(),
            };

            const newLog = await createLog(enrichedLogData);

            toast({
                title: "Success",
                description: "Log entry has been created successfully",
            });

            // Navigate to the new log's detail page
            router.push(`/logs/${newLog.id}`);
        } catch (error) {
            console.error("Error creating log:", error);
            toast({
                title: "Error",
                description: "Failed to create log entry",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/logs">Logs</Link></li>
                        <li className="text-base-content/70">New Log</li>
                    </ul>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Log</h1>
                    <p className="text-base-content/70">
                        Record a new daily log entry for a project
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-base-100 rounded-lg shadow-md p-4 sm:p-6">
                    <LogForm
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </main>
    );
};

export default NewLogPage;