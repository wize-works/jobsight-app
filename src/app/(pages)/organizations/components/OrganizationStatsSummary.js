'use client';
import { useMemo } from 'react';

const OrganizationStatsSummary = ({ organizations = [], loading = false }) => {
    // Calculate summary statistics
    const stats = useMemo(() => {
        if (!organizations.length) return { total: 0, active: 0, avgProjects: 0, avgUsers: 0 };

        const active = organizations.filter(org => org.isActive).length;
        const totalProjects = organizations.reduce((sum, org) => sum + (org.projectCount || 0), 0);
        const totalUsers = organizations.reduce((sum, org) => sum + (org.userCount || 0), 0);

        return {
            total: organizations.length,
            active,
            inactive: organizations.length - active,
            avgProjects: Math.round((totalProjects / organizations.length) * 10) / 10,
            avgUsers: Math.round((totalUsers / organizations.length) * 10) / 10
        };
    }, [organizations]);

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
            {/* Total Organizations */}
            <div className="card shadow-lg compact bg-base-100">
                <div className="card-body p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title text-base">Total Organizations</h2>
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-lg w-12">
                                <i className="fas fa-building text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <p className="text-2xl font-semibold mt-2">
                        {stats.total}
                        <span className="text-sm font-normal text-base-content/70 ml-2">
                            ({stats.active} active)
                        </span>
                    </p>
                </div>
            </div>

            {/* Average Projects */}
            <div className="card shadow-lg compact bg-base-100">
                <div className="card-body p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title text-base">Avg. Projects</h2>
                        <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-lg w-12">
                                <i className="fas fa-project-diagram text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <p className="text-2xl font-semibold mt-2">{stats.avgProjects}</p>
                </div>
            </div>

            {/* Average Team Size */}
            <div className="card shadow-lg compact bg-base-100">
                <div className="card-body p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title text-base">Avg. Team Size</h2>
                        <div className="avatar placeholder">
                            <div className="bg-secondary text-secondary-content rounded-lg w-12">
                                <i className="fas fa-users text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <p className="text-2xl font-semibold mt-2">{stats.avgUsers}</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationStatsSummary;