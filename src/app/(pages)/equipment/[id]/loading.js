export default function Loading() {
    return (
        <div className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="container mx-auto p-4 flex justify-center items-center min-h-[60vh]">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-2 text-muted-foreground">Loading equipment details...</p>
                </div>
            </div>
        </div>
    );
}