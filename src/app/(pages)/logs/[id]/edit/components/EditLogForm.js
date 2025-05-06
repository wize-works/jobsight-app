'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { updateDailyLog } from '@/services/log';
import LogForm from '../../../components/LogForm';

export default function EditLogForm({ log }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (logData) => {
        try {
            setIsSubmitting(true);

            // Add updated timestamp
            const updatedLogData = {
                ...logData,
                updatedAt: new Date().toISOString(),
            };

            await updateDailyLog(log._id, updatedLogData);

            toast({
                title: "Success",
                description: "Log entry has been updated successfully",
                variant: "success",
            });

            // Navigate back to the log's detail page
            router.push(`/logs/${log._id}`);
            router.refresh(); // Refresh the cache
        } catch (error) {
            console.error("Error updating log:", error);
            toast({
                title: "Error",
                description: "Failed to update log entry",
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
                    <li><Link href={`/logs/${log._id}`}>Log Details</Link></li>
                    <li className="text-base-content/70">Edit Log</li>
                </ul>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Edit Log</h1>
                <p className="text-base-content/70">
                    Update the details of this log entry
                </p>
            </div>

            {/* Form */}
            <LogForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                initialData={log}
                isEditing={true}
            />
        </div>
    );
}