import Link from 'next/link';
import { getProjectById } from '@/services/project';
import EditProjectForm from './components/EditProjectForm';
import EditPageLoading from './components/EditPageLoading';
import EditPageError from './components/EditPageError';

// This is a server component that fetches data server-side
export const EditProjectPage = async ({ params }) => {
    let project = null;
    let error = null;

    try {
        // Server-side data fetching
        project = await getProjectById(params.id);
    } catch (err) {
        console.error("Error fetching project:", err);
        error = "Failed to load project data. Please try again.";
    }

    // Show error state if there was an error or project not found
    if (error || !project) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <EditPageError message={error} />
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href={`/projects/${params.id}`}>{project.name}</Link></li>
                    <li className="text-base-content/70">Edit</li>
                </ul>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Edit Project</h1>
                <p className="text-base-content/70">Update the project details below.</p>
            </div>

            {/* Project Edit Form - Client Component */}
            <EditProjectForm project={project} />
        </main>
    );
};

export default EditProjectPage;