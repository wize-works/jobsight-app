import NewTaskForm from './components/NewTaskForm';

export default function NewTaskPage() {
    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <NewTaskForm />
        </main>
    );
}