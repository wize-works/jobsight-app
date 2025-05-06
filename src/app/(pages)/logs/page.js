import { getDailyLogs } from '@/services/log';
import LogsList from './components/LogsList';

export const LogsPage = async () => {
    let logs = [];

    try {
        // Server-side data geting using the log service directly, same as projects page
        const { data } = await getDailyLogs();
        logs = data || []; // Ensure logs is an array
    } catch (error) {
        console.error("Error geting logs:", error);
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <LogsList initialLogs={logs} />
        </main>
    );
};

export default LogsPage;