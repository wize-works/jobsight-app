import { getProjects } from '@/services/project';
import ProjectsList from './components/ProjectsList';

export const ProjectsPage = async () => {
    let projects = [];

    try {
        // Server-side data geting
        const { data } = await getProjects();
        projects = data || [];
    } catch (error) {
        console.error("Error geting projects:", error);
    }

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <ProjectsList initialProjects={projects} />
        </main>
    );
};

export default ProjectsPage;