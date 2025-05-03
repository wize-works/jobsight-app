import React from 'react';

const TeamStatsSummary = ({ teamMembers = [], loading = false }) => {
    // Calculate team stats
    const calculateTeamStats = () => {
        if (!teamMembers.length) return { departments: 0, projects: 0, activeTasks: 0 };

        // Count unique departments
        const departments = new Set(teamMembers.map(member => member.department)).size;

        // Count unique projects
        const projectSet = new Set();
        teamMembers.forEach(member => {
            if (member.projects && member.projects.length) {
                member.projects.forEach(project => projectSet.add(project));
            }
        });

        // Count active tasks
        const taskCount = teamMembers.reduce((acc, member) => acc + (member.tasks?.length || 0), 0);

        return {
            departments,
            projects: projectSet.size,
            activeTasks: taskCount
        };
    };

    const stats = calculateTeamStats();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="card shadow-lg compact bg-base-100 animate-pulse">
                        <div className="card-body p-4">
                            <div className="flex justify-between items-center">
                                <div className="h-5 bg-base-300 rounded w-24 mb-2"></div>
                                <div className="h-12 w-12 bg-base-300 rounded-lg"></div>
                            </div>
                            <div className="h-8 bg-base-300 rounded w-16 mt-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
            <div className="card shadow-lg compact bg-base-100 border-l-4 border-primary hover:shadow-xl transition-shadow duration-200">
                <div className="card-body p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-semibold text-base-content/60">Team Members</span>
                        <div className="h-8 w-8 sm:h-12 sm:w-12 bg-primary/20 text-primary flex items-center justify-center rounded-lg">
                            <i className="far fa-users fa-lg"></i>
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold mt-1">{teamMembers.length}</div>
                    <div className="text-xs sm:text-sm text-base-content/50 mt-1 flex items-center">
                        <span>From {stats.departments} departments</span>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg compact bg-base-100 border-l-4 border-secondary hover:shadow-xl transition-shadow duration-200">
                <div className="card-body p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-semibold text-base-content/60">Current Projects</span>
                        <div className="h-8 w-8 sm:h-12 sm:w-12 bg-secondary/20 text-secondary flex items-center justify-center rounded-lg">
                            <i className="far fa-building fa-lg"></i>
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold mt-1">{stats.projects}</div>
                    <div className="text-xs sm:text-sm text-base-content/50 mt-1 flex items-center">
                        <span>Across all teams</span>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg compact bg-base-100 border-l-4 border-accent hover:shadow-xl transition-shadow duration-200">
                <div className="card-body p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base font-semibold text-base-content/60">Ongoing Tasks</span>
                        <div className="h-8 w-8 sm:h-12 sm:w-12 bg-accent/20 text-accent flex items-center justify-center rounded-lg">
                            <i className="far fa-tasks fa-lg"></i>
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold mt-1">{stats.activeTasks}</div>
                    <div className="text-xs sm:text-sm text-base-content/50 mt-1 flex items-center">
                        <span>Assigned to team members</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamStatsSummary;