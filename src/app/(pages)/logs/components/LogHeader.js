'use client';

import { format } from 'date-fns';

export default function LogHeader({ log, className = '' }) {
    if (!log) return null;

    const getApprovalBadge = () => {
        if (log.approvals?.approved) {
            return (
                <span className="badge badge-success gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approved
                </span>
            );
        } else if (log.approvals?.requested) {
            return <span className="badge badge-warning">Pending Approval</span>;
        } else {
            return <span className="badge badge-outline">Draft</span>;
        }
    };

    const formatDateToDisplay = (dateString) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'MMM d, yyyy');
    };

    return (
        <div className={`card bg-base-200 shadow-sm ${className}`}>
            <div className="card-body p-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div>
                        <h2 className="card-title text-xl">{log.summary}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium">Project:</span>
                            <span className="badge badge-primary">{log.projectName}</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                        {getApprovalBadge()}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">Date: {formatDateToDisplay(log.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm">Author: {log.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Hours: {log.hours?.regular || 0} regular / {log.hours?.overtime || 0} overtime</span>
                    </div>
                </div>
            </div>
        </div>
    );
}