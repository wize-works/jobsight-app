'use client';
import Link from 'next/link';

const OrganizationCard = ({ organization, onClick }) => {
    const { id, name, description, industry, subscriptionTier, isActive, userCount, projectCount } = organization;

    // Helper function to get badge color based on subscription tier
    const getTierBadgeClass = (tier) => {
        switch (tier) {
            case 'free': return 'badge-outline';
            case 'basic': return 'badge-primary badge-outline';
            case 'professional': return 'badge-secondary';
            case 'enterprise': return 'badge-accent';
            default: return 'badge-outline';
        }
    };

    return (
        <div
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onClick(id)}
        >
            <div className="card-body p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="card-title text-lg font-semibold mb-1">{name}</h2>
                        {!isActive && (
                            <span className="badge badge-sm badge-error mb-2">Inactive</span>
                        )}
                    </div>
                    <div className="avatar placeholder">
                        <div className="bg-base-300 text-base-content rounded-lg w-12 h-12 flex items-center justify-center">
                            {name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>

                {description && (
                    <p className="text-sm text-base-content/70 line-clamp-2 mb-3">{description}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                    {industry && (
                        <span className="badge badge-sm">{industry}</span>
                    )}
                    {subscriptionTier && (
                        <span className={`badge badge-sm ${getTierBadgeClass(subscriptionTier)}`}>
                            {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}
                        </span>
                    )}
                </div>

                <div className="flex justify-between text-xs text-base-content/70">
                    <div>
                        <i className="fas fa-users mr-1"></i> {userCount || 0} users
                    </div>
                    <div>
                        <i className="fas fa-project-diagram mr-1"></i> {projectCount || 0} projects
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrganizationTableView = ({ organizations, onOrganizationClick }) => {
    // Helper function to get status badge class
    const getStatusBadgeClass = (isActive) => {
        return isActive ? 'badge-success' : 'badge-error';
    };

    // Helper function to get tier badge class
    const getTierBadgeClass = (tier) => {
        switch (tier) {
            case 'free': return 'badge-outline';
            case 'basic': return 'badge-primary badge-outline';
            case 'professional': return 'badge-secondary';
            case 'enterprise': return 'badge-accent';
            default: return 'badge-outline';
        }
    };

    return (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Industry</th>
                        <th>Status</th>
                        <th>Tier</th>
                        <th>Projects</th>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    {organizations.map((org) => (
                        <tr
                            key={org.id}
                            className="hover cursor-pointer"
                            onClick={() => onOrganizationClick(org.id)}
                        >
                            <td>
                                <div className="font-medium">{org.name}</div>
                                {org.description && (
                                    <div className="text-xs text-base-content/70 line-clamp-1">
                                        {org.description}
                                    </div>
                                )}
                            </td>
                            <td>{org.industry || 'N/A'}</td>
                            <td>
                                <span className={`badge badge-sm ${getStatusBadgeClass(org.isActive)}`}>
                                    {org.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <span className={`badge badge-sm ${getTierBadgeClass(org.subscriptionTier)}`}>
                                    {org.subscriptionTier ? org.subscriptionTier.charAt(0).toUpperCase() + org.subscriptionTier.slice(1) : 'N/A'}
                                </span>
                            </td>
                            <td>{org.projectCount || 0}</td>
                            <td>{org.userCount || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const OrganizationList = ({ organizations = [], loading = false, viewMode = 'grid', onOrganizationClick }) => {
    if (loading) {
        return viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="card bg-base-100 shadow animate-pulse h-52">
                        <div className="card-body p-5">
                            <div className="flex justify-between items-start">
                                <div className="h-7 bg-base-300 rounded w-1/2 mb-2"></div>
                                <div className="h-12 w-12 bg-base-300 rounded-lg"></div>
                            </div>
                            <div className="h-4 bg-base-300 rounded w-full mb-1"></div>
                            <div className="h-4 bg-base-300 rounded w-4/5 mb-3"></div>
                            <div className="flex gap-2 mb-3">
                                <div className="h-5 bg-base-300 rounded w-16"></div>
                                <div className="h-5 bg-base-300 rounded w-20"></div>
                            </div>
                            <div className="flex justify-between mt-auto">
                                <div className="h-4 bg-base-300 rounded w-16"></div>
                                <div className="h-4 bg-base-300 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow animate-pulse">
                <div className="h-12 bg-base-300 w-full mb-1"></div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-16 bg-base-200 w-full mb-1"></div>
                ))}
            </div>
        );
    }

    if (organizations.length === 0) {
        return (
            <div className="text-center p-10 bg-base-100 rounded-lg shadow">
                <div className="text-4xl text-base-content/30 mb-3">
                    <i className="fas fa-building"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">No Organizations Found</h3>
                <p className="text-base-content/70 mb-4">No organizations match your current filters.</p>
                <Link href="/organizations/new" className="btn btn-primary">
                    <i className="fas fa-plus mr-2"></i> Add Organization
                </Link>
            </div>
        );
    }

    return viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org) => (
                <OrganizationCard
                    key={org.id}
                    organization={org}
                    onClick={onOrganizationClick}
                />
            ))}
        </div>
    ) : (
        <OrganizationTableView
            organizations={organizations}
            onOrganizationClick={onOrganizationClick}
        />
    );
};

export default OrganizationList;