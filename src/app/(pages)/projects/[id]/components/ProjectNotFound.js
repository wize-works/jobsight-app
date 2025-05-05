'use client';

import Link from 'next/link';

export const ProjectNotFound = () => {
    return (
        <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                <i className="fas fa-exclamation-triangle text-2xl text-warning"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Project Not Found</h3>
            <p className="text-base-content/60 mb-6">
                The project you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/projects" className="btn btn-primary">
                Back to Projects
            </Link>
        </div>
    );
};

export default ProjectNotFound;