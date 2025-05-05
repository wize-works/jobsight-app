'use client';

const ProjectsLoading = () => {
    return (
        <div>
            {/* Loading header */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 bg-base-300 rounded w-40 animate-pulse"></div>
                <div className="h-10 bg-base-300 rounded w-32 animate-pulse"></div>
            </div>

            {/* Loading filters */}
            <div className="bg-base-100 p-4 rounded-lg shadow-md mb-6 animate-pulse">
                <div className="flex flex-wrap gap-4">
                    <div className="h-10 bg-base-300 rounded w-64"></div>
                    <div className="h-10 bg-base-300 rounded w-40"></div>
                    <div className="h-10 bg-base-300 rounded w-20 ml-auto"></div>
                </div>
            </div>

            {/* Loading project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="card bg-base-100 shadow-md animate-pulse">
                        <div className="card-body p-5">
                            <div className="h-7 bg-base-300 rounded mb-4 w-3/4"></div>
                            <div className="h-4 bg-base-300 rounded mb-2 w-1/2"></div>
                            <div className="h-4 bg-base-300 rounded mb-3 w-full"></div>
                            <div className="h-4 bg-base-300 rounded mb-3 w-5/6"></div>
                            <div className="mt-4 flex justify-between">
                                <div className="h-3 bg-base-300 rounded w-1/4"></div>
                                <div className="h-3 bg-base-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsLoading;