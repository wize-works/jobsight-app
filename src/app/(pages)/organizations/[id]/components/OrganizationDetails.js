'use client';
import { format } from 'date-fns';

const OrganizationDetails = ({ organization }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'MMM d, yyyy');
        } catch (error) {
            return 'Invalid date';
        }
    };

    const renderAddress = () => {
        const { address } = organization;
        if (!address) return 'No address provided';

        const parts = [
            address.street,
            address.city,
            address.state,
            address.postalCode,
            address.country
        ].filter(Boolean);

        return parts.join(', ');
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Organization Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information Section */}
                <div className="card bg-base-200">
                    <div className="card-body">
                        <h3 className="card-title text-lg">Basic Information</h3>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <tbody>
                                    <tr>
                                        <td className="font-medium">Name</td>
                                        <td>{organization.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Industry</td>
                                        <td>{organization.industry || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Description</td>
                                        <td>{organization.description || 'No description provided'}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Status</td>
                                        <td>
                                            <span className={`badge ${organization.isActive ? 'badge-success' : 'badge-error'}`}>
                                                {organization.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Subscription</td>
                                        <td className="capitalize">{organization.subscriptionTier || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="card bg-base-200">
                    <div className="card-body">
                        <h3 className="card-title text-lg">Contact Information</h3>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <tbody>
                                    <tr>
                                        <td className="font-medium">Email</td>
                                        <td>
                                            {organization.contactEmail ? (
                                                <a
                                                    href={`mailto:${organization.contactEmail}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {organization.contactEmail}
                                                </a>
                                            ) : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Phone</td>
                                        <td>
                                            {organization.contactPhone ? (
                                                <a
                                                    href={`tel:${organization.contactPhone}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {organization.contactPhone}
                                                </a>
                                            ) : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Website</td>
                                        <td>
                                            {organization.website ? (
                                                <a
                                                    href={organization.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    {organization.website.replace(/(^\w+:|^)\/\//, '')}
                                                </a>
                                            ) : 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Address</td>
                                        <td>{renderAddress()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Settings & Preferences Section */}
                <div className="card bg-base-200">
                    <div className="card-body">
                        <h3 className="card-title text-lg">Settings & Preferences</h3>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <tbody>
                                    <tr>
                                        <td className="font-medium">Timezone</td>
                                        <td>{organization.settings?.timezone || 'UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Date Format</td>
                                        <td>{organization.settings?.dateFormat || 'MM/DD/YYYY'}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Billing Cycle</td>
                                        <td className="capitalize">{organization.settings?.billingCycle || 'Monthly'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* System Information Section */}
                <div className="card bg-base-200">
                    <div className="card-body">
                        <h3 className="card-title text-lg">System Information</h3>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <tbody>
                                    <tr>
                                        <td className="font-medium">ID</td>
                                        <td>
                                            <code className="bg-base-300 px-2 py-1 rounded text-xs">
                                                {organization.id}
                                            </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Created</td>
                                        <td>{formatDate(organization.createdAt)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Last Updated</td>
                                        <td>{formatDate(organization.updatedAt)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;