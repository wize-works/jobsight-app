const ProjectsTable = ({ projects = [], loading = false }) => {
    if (loading) {
        return (
            <div className="card mb-6">
                <div className="card-header p-5">
                    <div className="flex justify-between items-center">
                        <div className="animate-pulse h-6 bg-muted-foreground/20 w-32 rounded"></div>
                        <div className="animate-pulse h-9 bg-muted-foreground/20 w-24 rounded"></div>
                    </div>
                </div>
                <div className="p-5">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    {[...Array(5)].map((_, i) => (
                                        <th key={i} className="text-left pb-3">
                                            <div className="animate-pulse h-4 bg-muted-foreground/20 w-24 rounded"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(3)].map((_, i) => (
                                    <tr key={i} className="border-b">
                                        {[...Array(5)].map((_, j) => (
                                            <td key={j} className="py-3">
                                                <div className="animate-pulse h-4 bg-muted-foreground/20 w-full rounded"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // Sort projects by status (active first) and then by most recent start date
    const sortedProjects = [...projects].sort((a, b) => {
        // Active projects first
        if (a.status === "active" && b.status !== "active") return -1;
        if (a.status !== "active" && b.status === "active") return 1;

        // Then sort by start date (most recent first)
        return new Date(b.startDate) - new Date(a.startDate);
    }).slice(0, 5); // Limit to 5 projects for dashboard

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'badge-primary';
            case 'completed': return 'badge-success';
            case 'on hold': return 'badge-warning';
            case 'planning': return 'badge-info';
            default: return 'badge-secondary';
        }
    };

    const calculateCompletion = (project) => {
        return project.completion || 0;
    };

    return (
        <div className="card mb-6">
            <div className="card-header p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Active Projects</h2>
                    <button className="btn btn-primary btn-sm">View All</button>
                </div>
            </div>
            <div className="p-5">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Project Name</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Client</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Completion</th>
                                <th className="text-left pb-3 text-sm font-medium text-muted-foreground">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-muted-foreground">
                                        No active projects found
                                    </td>
                                </tr>
                            ) : (
                                sortedProjects.map((project) => (
                                    <tr key={project.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3">
                                            <div className="font-medium">{project.name}</div>
                                        </td>
                                        <td className="py-3 text-muted-foreground">{project.client}</td>
                                        <td className="py-3">
                                            <span className={`badge ${getStatusClass(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                <div className="w-full bg-muted rounded-full h-2 mr-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full"
                                                        style={{ width: `${calculateCompletion(project)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {calculateCompletion(project)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-muted-foreground">
                                            {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectsTable;