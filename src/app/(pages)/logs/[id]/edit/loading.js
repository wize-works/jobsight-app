// Loading component for the edit log page
export default function Loading() {
    return (
        <div className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Breadcrumbs skeleton */}
                <div className="text-sm breadcrumbs mb-4 opacity-70">
                    <ul>
                        <li className="bg-base-300 h-4 w-20 rounded"></li>
                        <li className="bg-base-300 h-4 w-16 rounded"></li>
                        <li className="bg-base-300 h-4 w-24 rounded"></li>
                        <li className="bg-base-300 h-4 w-20 rounded"></li>
                    </ul>
                </div>

                {/* Header skeleton */}
                <div className="mb-6">
                    <div className="bg-base-300 h-8 w-48 rounded mb-2"></div>
                    <div className="bg-base-300 h-4 w-96 rounded"></div>
                </div>

                {/* Form skeleton */}
                <div className="bg-base-100 rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="animate-pulse">
                            <div className="bg-base-300 h-4 w-24 rounded mb-2"></div>
                            <div className="bg-base-300 h-10 w-full rounded"></div>
                        </div>
                        <div className="animate-pulse">
                            <div className="bg-base-300 h-4 w-24 rounded mb-2"></div>
                            <div className="bg-base-300 h-10 w-full rounded"></div>
                        </div>
                    </div>

                    <div className="animate-pulse mb-6">
                        <div className="bg-base-300 h-4 w-32 rounded mb-2"></div>
                        <div className="bg-base-300 h-32 w-full rounded"></div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <div className="bg-base-300 h-10 w-24 rounded"></div>
                        <div className="bg-base-300 h-10 w-32 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}