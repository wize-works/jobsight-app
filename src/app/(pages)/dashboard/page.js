import { ProjectService } from '@/services/project';
import ProjectCard from '../projects/components/card';
import StatBox from './components/stat-box';

export default async function Dashboard() {
    const activeProjects = await ProjectService.getActiveProjects();

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-base-content/70">
                        Welcome back! Here&apos;s what’s happening across your projects today.
                    </p>
                </div>
                {/* <TimeToggle onChange={(val) => console.log('Switched to', val)} /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatBox
                    title="Active Projects"
                    value={activeProjects.length}
                    description="Total number of active projects"
                    icon={<i className="fas fa-truck-ladder"></i>}
                    trend="up"
                    color="primary"
                />
                <StatBox
                    title="Tasks Due Today"
                    value={activeProjects.filter((p) => p.status === 'in_progress').length}
                    description="Number of tasks due today"
                    icon={<i className="fas fa-list-check"></i>}
                    trend="up"
                    color="success"
                />
                <StatBox
                    title="Completed Projects"
                    value={activeProjects.filter((p) => p.status === 'completed').length}
                    description="Number of completed projects"
                    icon={<i className="fas fa-check"></i>}
                    trend="down"
                    color="info"
                />
                <StatBox
                    title="Equipment Status"
                    value={activeProjects.filter((p) => p.status === 'completed').length}
                    description="Percentage of equipment in good condition"
                    icon={<i className="fas fa-forklift"></i>}
                    trend="down"
                    color="info"
                />
            </div>
            <div>


                {/* Active Projects */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Active Projects</h2>
                    <div className="overflow-x-auto">
                        <div className="flex gap-4">
                            {activeProjects.length === 0 && <p>No active projects found.</p>}
                            {activeProjects.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
