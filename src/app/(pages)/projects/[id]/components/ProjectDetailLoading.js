'use client';

export const ProjectDetailLoading = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="h-8 bg-base-300 rounded animate-pulse w-24"></div>
                <div className="h-8 bg-base-300 rounded animate-pulse w-32"></div>
            </div>
            <div className="bg-base-100 rounded-lg shadow-md p-6">
                <div className="h-8 bg-base-300 rounded animate-pulse w-3/4 mb-4"></div>
                <div className="h-4 bg-base-300 rounded animate-pulse w-1/2 mb-3"></div>
                <div className="h-4 bg-base-300 rounded animate-pulse w-full mb-3"></div>
                <div className="h-4 bg-base-300 rounded animate-pulse w-5/6 mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-64 bg-base-300 rounded animate-pulse"></div>
                    <div className="h-64 bg-base-300 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailLoading;