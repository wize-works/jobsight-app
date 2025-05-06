'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const OrganizationHeader = ({ organization, onEdit }) => {
    const [showConfirmDeactivate, setShowConfirmDeactivate] = useState(false);

    // Helper function to get display text and class for subscription tier
    const getTierDisplayInfo = (tier) => {
        const tierName = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Unknown';

        let badgeClass = 'badge-outline';
        switch (tier) {
            case 'free':
                badgeClass = 'badge-outline';
                break;
            case 'basic':
                badgeClass = 'badge-primary badge-outline';
                break;
            case 'professional':
                badgeClass = 'badge-secondary';
                break;
            case 'enterprise':
                badgeClass = 'badge-accent';
                break;
            default:
                badgeClass = 'badge-outline';
        }

        return { name: tierName, badgeClass };
    };

    const handleDeactivateClick = () => {
        setShowConfirmDeactivate(true);
    };

    const handleCancelDeactivate = () => {
        setShowConfirmDeactivate(false);
    };

    const handleConfirmDeactivate = async () => {
        try {
            // Call API to deactivate organization
            // await deactivateOrganization(organization.id);

            // Show success notification
            // toast({ title: "Success", description: "Organization deactivated" });

            // Refresh the organization data or redirect
            setShowConfirmDeactivate(false);
        } catch (error) {
            console.error("Error deactivating organization:", error);
            // toast({ title: "Error", description: "Failed to deactivate organization", variant: "destructive" });
        }
    };

    const tierInfo = getTierDisplayInfo(organization.subscriptionTier);
    const lastUpdated = organization.updatedAt
        ? formatDistanceToNow(new Date(organization.updatedAt), { addSuffix: true })
        : 'unknown';

    return (
        <div className="bg-base-100 rounded-lg shadow-lg mb-6">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        {organization.logoUrl ? (
                            <img
                                src={organization.logoUrl}
                                alt={`${organization.name} logo`}
                                className="w-16 h-16 rounded-lg"
                            />
                        ) : (
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-16 h-16 rounded-lg text-2xl">
                                    {organization.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{organization.name}</h1>
                                {!organization.isActive && (
                                    <span className="badge badge-error">Inactive</span>
                                )}
                            </div>

                            {organization.industry && (
                                <div className="text-sm text-base-content/70">
                                    <i className="fas fa-industry mr-1"></i> {organization.industry}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            className="btn btn-outline"
                            onClick={onEdit}
                        >
                            <i className="fas fa-edit mr-2"></i> Edit
                        </button>

                        {organization.isActive ? (
                            <button
                                className="btn btn-error btn-outline"
                                onClick={handleDeactivateClick}
                            >
                                <i className="fas fa-ban mr-2"></i> Deactivate
                            </button>
                        ) : (
                            <button
                                className="btn btn-success btn-outline"
                            >
                                <i className="fas fa-check-circle mr-2"></i> Activate
                            </button>
                        )}
                    </div>
                </div>

                {organization.description && (
                    <p className="text-base-content/80 mb-4">{organization.description}</p>
                )}

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {/* Tier */}
                    <div className="flex items-center">
                        <span className="text-sm text-base-content/70 mr-2">Tier:</span>
                        <span className={`badge ${tierInfo.badgeClass}`}>{tierInfo.name}</span>
                    </div>

                    {/* Website */}
                    {organization.website && (
                        <div className="flex items-center">
                            <i className="fas fa-globe text-base-content/60 mr-2"></i>
                            <a
                                href={organization.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                {organization.website.replace(/(^\w+:|^)\/\//, '')}
                            </a>
                        </div>
                    )}

                    {/* Contact Email */}
                    {organization.contactEmail && (
                        <div className="flex items-center">
                            <i className="fas fa-envelope text-base-content/60 mr-2"></i>
                            <a
                                href={`mailto:${organization.contactEmail}`}
                                className="text-primary hover:underline"
                            >
                                {organization.contactEmail}
                            </a>
                        </div>
                    )}

                    {/* Contact Phone */}
                    {organization.contactPhone && (
                        <div className="flex items-center">
                            <i className="fas fa-phone text-base-content/60 mr-2"></i>
                            <a
                                href={`tel:${organization.contactPhone}`}
                                className="text-primary hover:underline"
                            >
                                {organization.contactPhone}
                            </a>
                        </div>
                    )}

                    {/* Last Updated */}
                    <div className="flex items-center ml-auto text-xs text-base-content/50">
                        <i className="fas fa-clock mr-1"></i> Updated {lastUpdated}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-base-200 p-4 rounded-b-lg border-t border-base-300 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat px-3 py-2">
                    <div className="stat-title text-xs">Users</div>
                    <div className="stat-value text-2xl">{organization.userCount || 0}</div>
                </div>

                <div className="stat px-3 py-2">
                    <div className="stat-title text-xs">Projects</div>
                    <div className="stat-value text-2xl">{organization.projectCount || 0}</div>
                </div>

                <div className="stat px-3 py-2">
                    <div className="stat-title text-xs">Billing Cycle</div>
                    <div className="stat-value text-lg capitalize">
                        {organization.settings?.billingCycle || 'Monthly'}
                    </div>
                </div>

                <div className="stat px-3 py-2">
                    <div className="stat-title text-xs">Timezone</div>
                    <div className="stat-value text-lg">
                        {organization.settings?.timezone || 'UTC'}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmDeactivate && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Deactivate Organization</h3>
                        <p className="py-4">
                            Are you sure you want to deactivate {organization.name}?
                            This will prevent users from accessing projects and resources.
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-outline"
                                onClick={handleCancelDeactivate}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={handleConfirmDeactivate}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={handleCancelDeactivate}></div>
                </div>
            )}
        </div>
    );
};

export default OrganizationHeader;