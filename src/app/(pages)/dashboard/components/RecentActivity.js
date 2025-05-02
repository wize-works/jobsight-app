const RecentActivity = ({ activities = [], onViewAll = () => { }, loading = false }) => {
    if (loading) {
        return (
            <div className="card mb-6">
                <div className="card-header p-5">
                    <div className="flex justify-between items-center">
                        <div className="animate-pulse h-6 bg-muted-foreground/20 w-40 rounded"></div>
                        <div className="animate-pulse h-8 bg-muted-foreground/20 w-24 rounded"></div>
                    </div>
                </div>
                <div className="p-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0">
                            <div className="flex items-start">
                                <div className="animate-pulse h-10 w-10 bg-muted-foreground/20 rounded-full mr-4"></div>
                                <div className="flex-1">
                                    <div className="animate-pulse h-4 bg-muted-foreground/20 w-4/5 mb-2 rounded"></div>
                                    <div className="animate-pulse h-3 bg-muted-foreground/20 w-24 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const getActivityIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'project':
                return (
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                );
            case 'task':
                return (
                    <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                );
            case 'document':
                return (
                    <div className="h-10 w-10 bg-info/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                );
            case 'equipment':
                return (
                    <div className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                );
            case 'financial':
                return (
                    <div className="h-10 w-10 bg-success/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }

        // If more than a week ago, return formatted date
        return past.toLocaleDateString();
    };

    return (
        <div className="card mb-6">
            <div className="card-header p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                    <button onClick={onViewAll} className="btn btn-sm btn-outline">View All</button>
                </div>
            </div>
            <div className="p-5">
                {activities.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <p>No recent activities</p>
                    </div>
                ) : (
                    activities.map((activity) => (
                        <div key={activity.id} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0">
                            <div className="flex items-start">
                                {getActivityIcon(activity.type)}
                                <div className="ml-4">
                                    <p className="text-sm">
                                        <span className="font-medium">{activity.user}</span>{' '}
                                        {activity.action}{' '}
                                        <span className="font-medium">{activity.subject}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatTimeAgo(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivity;