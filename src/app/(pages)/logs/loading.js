// Loading component for the logs page
export default function Loading() {
    return (
        <div className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="p-8 flex flex-col items-center justify-center bg-base-100 rounded-lg shadow-md">
                <div className="loading loading-spinner loading-lg mb-4"></div>
                <p className="text-base-content/70">Loading logs...</p>
            </div>
        </div>
    );
}