import { getDailyLogById } from '@/services/log';
import LogDetailView from './components/LogDetailView';
import LogNotFound from './components/LogNotFound';

export const LogDetailPage = async ({ params }) => {
    let log = null;

    try {
        // Server-side data geting using the log service directly
        log = await getDailyLogById(params._id);
    } catch (error) {
        console.error("Error geting log details:", error);
    }

    // Show not found state if log doesn't exist
    if (!log) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <LogNotFound />
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <LogDetailView log={log} />
        </main>
    );
};

export default LogDetailPage;