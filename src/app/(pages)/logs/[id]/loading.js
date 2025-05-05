// Loading component for the log detail page
export default function Loading() {
    return (
        <div className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="bg-base-100 rounded-lg shadow-md p-10 animate-fadeIn">
                <div className="text-sm breadcrumbs mb-4 opacity-70">
                    <ul>
                        <li className="bg-base-200 h-4 w-20 rounded"></li>
                        <li className="bg-base-200 h-4 w-16 rounded"></li>
                        <li className="bg-base-200 h-4 w-24 rounded"></li>
                    </ul>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div className="bg-base-200 h-8 w-48 rounded"></div>
                    <div className="flex gap-2">
                        <div className="bg-base-200 h-10 w-20 rounded"></div>
                        <div className="bg-base-200 h-10 w-20 rounded"></div>
                        <div className="bg-base-200 h-10 w-20 rounded"></div>
                    </div>
                </div>

                {/* Log info section */}
                <div className="bg-base-200 p-6 rounded-lg mb-6 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="h-8 bg-base-300 rounded"></div>
                        <div className="h-8 bg-base-300 rounded"></div>
                        <div className="h-8 bg-base-300 rounded"></div>
                    </div>
                </div>

                {/* Log approval section */}
                <div className="bg-base-200 p-6 rounded-lg mb-6 animate-pulse">
                    <div className="h-10 bg-base-300 rounded mb-4 w-48"></div>
                    <div className="h-20 bg-base-300 rounded"></div>
                </div>

                {/* Log details section */}
                <div className="bg-base-200 p-6 rounded-lg animate-pulse">
                    <div className="h-10 bg-base-300 rounded mb-4 w-32"></div>
                    <div className="h-40 bg-base-300 rounded mb-6"></div>
                    <div className="h-10 bg-base-300 rounded mb-4 w-40"></div>
                    <div className="h-60 bg-base-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}