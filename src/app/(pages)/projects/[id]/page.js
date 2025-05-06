import { getProjectById } from '@/services/project';
import ProjectDetailView from './components/ProjectDetailView';
import ProjectNotFound from './components/ProjectNotFound';

export const ProjectDetailPage = async ({ params }) => {
    let project = null;

    try {
        // Server-side data geting
        project = await getProjectById(params._id);
    } catch (error) {
        console.error("Error geting project details:", error);
    }

    // Show not found state if project doesn't exist
    if (!project) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <ProjectNotFound />
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <ProjectDetailView project={project} />
        </main>
    );
};

export default ProjectDetailPage;