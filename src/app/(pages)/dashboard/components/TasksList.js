const TasksList = ({
    tasks = [],
    onMarkComplete = () => { },
    onEdit = () => { },
    onViewAll = () => { },
    loading = false
}) => {
    if (loading) {
        return (
            <div className="card h-full">
                <div className="card-header p-5">
                    <div className="flex justify-between items-center">
                        <div className="animate-pulse h-6 bg-muted-foreground/20 w-32 rounded"></div>
                        <div className="animate-pulse h-8 bg-muted-foreground/20 w-24 rounded"></div>
                    </div>
                </div>
                <div className="p-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0">
                            <div className="flex items-start gap-3">
                                <div className="animate-pulse h-5 w-5 bg-muted-foreground/20 rounded mt-1"></div>
                                <div className="flex-1">
                                    <div className="animate-pulse h-5 bg-muted-foreground/20 w-4/5 rounded mb-2"></div>
                                    <div className="animate-pulse h-4 bg-muted-foreground/20 w-3/5 rounded"></div>
                                </div>
                                <div className="animate-pulse h-8 w-20 bg-muted-foreground/20 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Prioritize tasks - urgent first, then by due date
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
        if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;

        // Then sort by due date (earliest first)
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'text-error';
            case 'high': return 'text-warning';
            default: return 'text-muted-foreground';
        }
    };

    const formatDueTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="card h-full">
            <div className="card-header p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Today&apos;s Tasks</h2>
                    <button onClick={onViewAll} className="btn btn-sm btn-outline">View All</button>
                </div>
            </div>
            <div className="p-5">
                {sortedTasks.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <p>No tasks due today</p>
                        <button
                            className="btn btn-sm btn-primary mt-3"
                            onClick={() => console.log("Add new task")}
                        >
                            Add New Task
                        </button>
                    </div>
                ) : (
                    sortedTasks.map((task) => (
                        <div key={task.id} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox mt-1"
                                    checked={task.status === 'completed'}
                                    onChange={() => onMarkComplete(task.id)}
                                />
                                <div className="flex-1">
                                    <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                        {task.title}
                                    </h3>
                                    <div className="flex items-center text-sm mt-1">
                                        <span className={`mr-3 ${getPriorityClass(task.priority)}`}>
                                            {task.priority && `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority`}
                                        </span>
                                        <span className="text-muted-foreground">Due {formatDueTime(task.dueDate)}</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => onEdit(task.id)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TasksList;