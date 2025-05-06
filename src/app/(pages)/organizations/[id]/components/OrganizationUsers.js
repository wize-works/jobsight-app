'use client';

const OrganizationUsers = ({ organization }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Users</h2>
                <button className="btn btn-primary btn-sm">
                    <i className="fas fa-user-plus mr-2"></i> Add User
                </button>
            </div>

            <div className="bg-base-200 rounded-lg p-12 text-center">
                <div className="text-4xl text-base-content/30 mb-3">
                    <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">User Management Coming Soon</h3>
                <p className="text-base-content/70 mb-4 max-w-md mx-auto">
                    This section will allow you to manage users within this organization,
                    including assigning roles, permissions, and project access.
                </p>
            </div>
        </div>
    );
};

export default OrganizationUsers;