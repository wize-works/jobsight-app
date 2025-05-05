'use client';

import Link from 'next/link';

export default function LogNotFound() {
    return (
        <div className="bg-base-100 rounded-lg shadow-md p-10 text-center animate-fadeIn">
            <div className="mx-auto w-20 h-20 bg-base-200 flex items-center justify-center rounded-full mb-6">
                <i className="fas fa-search text-3xl text-base-content/50"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4">Log Not Found</h2>
            <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                The log you&apos;re looking for doesn&apos;t exist or you may not have permission to view it.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/logs" className="btn btn-primary">
                    <i className="fas fa-arrow-left mr-2"></i> Back to Logs
                </Link>
                <Link href="/logs/new" className="btn btn-outline">
                    <i className="fas fa-plus mr-2"></i> Create New Log
                </Link>
            </div>
        </div>
    );
}