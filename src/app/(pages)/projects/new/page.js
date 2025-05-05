import Link from 'next/link';
import NewProjectForm from './components/NewProjectForm';

export const NewProjectPage = () => {
    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li className="text-base-content/70">New Project</li>
                </ul>
            </div>

            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Project</h1>
                <p className="text-base-content/70">Fill in the project details below to get started.</p>
            </div>

            <NewProjectForm />
        </main>
    );
};

export default NewProjectPage;