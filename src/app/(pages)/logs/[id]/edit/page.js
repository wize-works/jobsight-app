import { getDailyLogById } from '@/services/log';
import LogEditForm from './components/LogEditForm';
import LogNotFound from '../components/LogNotFound';

export const EditLogPage = async ({ params }) => {
    let log = null;

    try {
        // Server-side data fetching using the log service directly
        log = await getDailyLogById(params.id);
    } catch (error) {
        console.error("Error fetching log details:", error);
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
            <LogEditForm log={log} />
        </main>
    );
};

export default EditLogPage;