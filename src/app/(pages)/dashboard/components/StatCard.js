const StatCards = ({
    activeProjects = 0,
    tasksDueToday = 0,
    monthlyRevenue = 0,
    equipmentStatus = 0,
    loading = false
}) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="card animate-pulse relative overflow-hidden border-l-4 border-l-muted">
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <div className="h-5 bg-muted rounded w-3/5 mb-3"></div>
                                    <div className="h-8 bg-muted-foreground/20 rounded w-1/3 mb-4"></div>
                                    <div className="h-4 bg-muted rounded w-4/5"></div>
                                </div>
                                <div className="h-12 w-12 bg-muted rounded-lg flex-shrink-0"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card relative overflow-hidden border-l-4 border-l-primary">
                <div className="card-body p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1">Active Projects</h3>
                            <div className="text-3xl font-bold text-primary">{activeProjects}</div>
                            <p className="text-sm mt-2 flex items-center text-muted-foreground">
                                <span className="inline-flex items-center text-success mr-1">
                                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    2
                                </span>
                                since last month
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg">
                            <i className="fas fa-clipboard-list text-primary h-6 w-6"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card relative overflow-hidden border-l-4 border-l-accent">
                <div className="card-body p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1">Tasks Due Today</h3>
                            <div className="text-3xl font-bold text-accent">{tasksDueToday}</div>
                            <p className="text-sm mt-2 text-muted-foreground">
                                <span className="font-medium text-warning">8 urgent</span>, 15 normal
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-accent/10 flex items-center justify-center rounded-lg">
                            <i className="fas fa-tasks text-accent h-6 w-6"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card relative overflow-hidden border-l-4 border-l-success">
                <div className="card-body p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1">Monthly Revenue</h3>
                            <div className="text-3xl font-bold text-success">${(monthlyRevenue / 1000).toFixed(1)}k</div>
                            <p className="text-sm mt-2 flex items-center text-muted-foreground">
                                <span className="inline-flex items-center text-success mr-1">
                                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    12%
                                </span>
                                vs last month
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-success/10 flex items-center justify-center rounded-lg">
                            <i className="fas fa-dollar-sign text-success h-6 w-6"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card relative overflow-hidden border-l-4 border-l-secondary">
                <div className="card-body p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1">Equipment Status</h3>
                            <div className="text-3xl font-bold text-secondary">{equipmentStatus}%</div>
                            <p className="text-sm mt-2 text-muted-foreground">
                                <span className="font-medium text-warning">3 items</span> need maintenance
                            </p>
                        </div>
                        <div className="h-12 w-12 bg-secondary/10 flex items-center justify-center rounded-lg">
                            <i className="fas fa-truck text-secondary h-6 w-6"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCards;
