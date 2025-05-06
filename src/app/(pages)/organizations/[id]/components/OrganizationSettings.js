'use client';

const OrganizationSettings = ({ organization }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Organization Settings</h2>
                <button className="btn btn-primary btn-sm">
                    <i className="fas fa-save mr-2"></i> Save Changes
                </button>
            </div>

            <div className="bg-base-200 rounded-lg p-12 text-center">
                <div className="text-4xl text-base-content/30 mb-3">
                    <i className="fas fa-cog"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Settings Management Coming Soon</h3>
                <p className="text-base-content/70 mb-4 max-w-md mx-auto">
                    This section will allow you to configure organization-wide settings including
                    billing preferences, notification settings, and integration options.
                </p>
            </div>
        </div>
    );
};

export default OrganizationSettings;