'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { updateDailyLog } from '@/services/log';
import LogForm from '../../../components/LogForm';

export default function LogEditForm({ log }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (logData) => {
        setIsSubmitting(true);
        try {
            await updateDailyLog(log._id, logData);
            toast({
                title: "Success",
                description: "Log has been updated successfully",
                variant: "success",
            });
            router.push(`/logs/${log._id}`);
            router.refresh(); // Refresh the page cache to show updated data
            return true;
        } catch (error) {
            console.error("Error updating log:", error);
            toast({
                title: "Error",
                description: "Failed to update log",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-fadeIn">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/logs">Logs</Link></li>
                    <li><Link href={`/logs/${log._id}`}>Log Details</Link></li>
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
    );
}