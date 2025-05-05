'use client';

export const NewProjectLoading = () => {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-8 bg-base-300 rounded w-1/3"></div>
            <div className="h-4 bg-base-300 rounded w-1/2"></div>
            <div className="h-64 bg-base-300 rounded"></div>
        </div>
    );
};

export default NewProjectLoading;