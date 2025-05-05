import NewLogForm from './components/NewLogForm';

export const NewLogPage = async () => {
    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <NewLogForm />
        </main>
    );
};

export default NewLogPage;