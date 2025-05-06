import TasksPageClient from './components/TasksPageClient';

export default function TasksPage() {
    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <TasksPageClient />
        </main>
    );
}