import { getDailyLogById } from '@/services/log';
import EditLogForm from './components/EditLogForm';
import LogNotFound from '../components/LogNotFound';

export const EditLogPage = async ({ params }) => {
    let log = null;

    try {
        // Server-side data geting using the log service directly
        log = await getDailyLogById(params._id);
    } catch (error) {
        console.error("Error geting log details for editing:", error);
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
            <EditLogForm log={log} />
        </main>
    );
};

export default EditLogPage;