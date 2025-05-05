'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { createDailyLog } from '@/services/log';
import LogForm from '../../components/LogForm';

export default function NewLogForm() {
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
            const newLog = await createDailyLog(enrichedLogData);
            toast({
                title: "Success",
                description: "Log entry has been created successfully",
                variant: "success",
            });

            // Navigate to the new log's detail page
            router.push(`/logs/${newLog._id}`);
            router.refresh(); // Refresh the cache
        } catch (error) {
            console.error("Error creating log:", error);
            toast({
                title: "Error",
                description: "Failed to create log entry",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsSubmitting(false);
        }

        return true;
    };

    return (
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

            {/* Form */}
            <LogForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}