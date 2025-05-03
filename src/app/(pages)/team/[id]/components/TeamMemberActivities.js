import React from 'react';

const TeamMemberActivities = ({ activities = [], loading = false }) => {
    if (loading) {
        return (
            <div className="bg-base-100 rounded-lg shadow-md p-6">
                <div className="h-6 bg-base-300 rounded w-48 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-base-300 mr-4"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-base-300 rounded w-1/2"></div>
                            </div>
                            <div className="h-3 bg-base-300 rounded w-16"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        // Less than a minute
        if (seconds < 60) {
            return 'just now';
        }

        // Less than an hour
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes}m ago`;
        }

        // Less than a day
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours}h ago`;
        }

        // Less than a week
        const days = Math.floor(hours / 24);
        if (days < 7) {
            return `${days}d ago`;
        }

        // Format date for older activities
        return date.toLocaleDateString();
    };

    const getActivityIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'project':
                return (
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-project-diagram text-primary"></i>
                    </div>
                );
            case 'task':
                return (
                    <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-tasks text-accent"></i>
                    </div>
                );
            case 'document':
                return (
                    <div className="h-10 w-10 bg-info/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-file text-info"></i>
                    </div>
                );
            case 'equipment':
                return (
                    <div className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-tools text-secondary"></i>
                    </div>
                );
            case 'financial':
                return (
                    <div className="h-10 w-10 bg-success/10 rounded-full flex items-center justify-center">
                        <i className="fas fa-dollar-sign text-success"></i>
                    </div>
                );
            default:
                return (
                    <div className="h-10 w-10 bg-base-300 rounded-full flex items-center justify-center">
                        <i className="fas fa-history text-base-content/70"></i>
                    </div>
                );
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

            {activities.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                    <i className="fas fa-history text-2xl mb-2"></i>
                    <p>No recent activities</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                            {getActivityIcon(activity.type)}

                            <div className="ml-4 flex-1">
                                <div className="font-medium">
                                    {activity.action} <span className="font-semibold">{activity.subject}</span>
                                </div>
                                <div className="text-xs text-base-content/70">
                                    {formatTimeAgo(activity.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamMemberActivities;