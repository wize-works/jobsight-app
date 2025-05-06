const TasksList = ({
    tasks = [],
    onMarkComplete = () => { },
    onEdit = () => { },
    onViewAll = () => { },
    loading = false
}) => {
    if (loading) {
        return (
            <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 bg-base-200 rounded-t-lg">
                    <div className="animate-pulse h-5 sm:h-6 bg-muted-foreground/20 w-24 sm:w-32 rounded"></div>
                    <div className="animate-pulse h-7 sm:h-8 bg-muted-foreground/20 w-20 sm:w-24 rounded"></div>
                </div>
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th className="w-10"></th>
                                <th>Task</th>
                                <th className="hidden sm:table-cell">Priority</th>
                                <th className="hidden md:table-cell">Due Time</th>
                                <th className="w-20"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(4)].map((_, i) => (
                                <tr key={i}>
                                    <td colSpan="5" className="text-center p-4">
                                        <div className="animate-pulse h-4 bg-muted-foreground/20 w-full rounded"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    // Prioritize tasks - urgent first, then by due date
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
        if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'badge badge-error';
            case 'high': return 'badge badge-warning';
            case 'normal': return 'badge badge-info';
            case 'low': return 'badge badge-success';
            default: return 'badge badge-ghost';
        }
    };

    const formatDueTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4">
                <h2 className="text-base sm:text-lg font-semibold">Today&apos;s Tasks</h2>
                <button className="btn btn-primary btn-sm w-full sm:w-auto" onClick={onViewAll}>View All Tasks</button>
            </div>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="w-10"></th>
                            <th>Task</th>
                            <th className="hidden sm:table-cell">Priority</th>
                            <th className="hidden md:table-cell">Due Time</th>
                            <th className="w-20"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    <p className="text-muted-foreground">No tasks due today</p>
                                    <button
                                        className="btn btn-sm btn-primary mt-2"
                                        onClick={() => console.log("Add new task")}
                                    >
                                        Add New Task
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            sortedTasks.map((task) => (
                                <tr key={task._id} className="hover:bg-base-200 hover:shadow-md transition-colors duration-200">
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={task.status === 'completed'}
                                            onChange={() => onMarkComplete(task._id)}
                                        />
                                    </td>
                                    <td className="font-medium">
                                        <span className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                                            {task.title}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell">
                                        <span className={getPriorityClass(task.priority)}>
                                            {task.priority && `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`}
                                        </span>
                                    </td>
                                    <td className="hidden md:table-cell text-muted-foreground">
                                        {formatDueTime(task.dueDate)}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => onEdit(task._id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TasksList;