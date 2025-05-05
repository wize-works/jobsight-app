'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getDailyLogs } from '@/services/log';
import { useToast } from '@/hooks/use-toast';
import LogsList from './LogsList';

export default function LogsListWrapper({ initialLogs }) {
    const [logs, setLogs] = useState(initialLogs);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const { toast } = useToast();

    // Extract filter parameters from the URL
    const projectId = searchParams.get('projectId') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const author = searchParams.get('author') || '';

    // Load filtered logs when URL parameters change
    useEffect(() => {
        // Skip if no filters are applied
        if (!projectId && !dateFrom && !dateTo && !author) {
            return;
        }

        const loadFilteredLogs = async () => {
            setIsLoading(true);
            try {
                // Use our log service with filter parameters
                const filterOptions = {
                    filter: {}
                };

                if (projectId) {
                    filterOptions.filter.projectId = projectId;
                }

                if (dateFrom || dateTo) {
                    filterOptions.filter.date = {};
                    if (dateFrom) {
                        filterOptions.filter.date.gte = new Date(dateFrom);
                    }
                    if (dateTo) {
                        filterOptions.filter.date.lte = new Date(dateTo);
                    }
                }

                if (author) {
                    filterOptions.filter.author = { contains: author };
                }

                // Use the log service instead of direct GraphQL query
                const logsData = await getDailyLogs(filterOptions);
                setLogs(logsData || []);
            } catch (error) {
                console.error("Error fetching filtered logs:", error);
                toast({
                    title: "Error",
                    description: "Could not load filtered logs",
                    variant: "destructive"
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadFilteredLogs();
    }, [projectId, dateFrom, dateTo, author, toast]);

    return <LogsList initialLogs={logs} isLoadingFiltered={isLoading} />;
}