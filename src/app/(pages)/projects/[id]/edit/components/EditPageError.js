'use client';

import Link from 'next/link';

export const EditPageError = ({ message = "Project not found" }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="mb-4">{message}</p>
            <Link href="/projects" className="btn btn-primary">
                Back to Projects
            </Link>
        </div>
    );
};

export default EditPageError;