import React, { useMemo } from 'react';

const TaskStatsSummary = ({ tasks = [], loading = false }) => {
    // Calculate task statistics
    const stats = useMemo(() => {
        if (!tasks.length) {
            return {
                total: 0,
                completed: 0,
                pending: 0,
                overdue: 0,
                upcoming: 0,
                completionRate: 0,
                overdueRate: 0
            };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const completed = tasks.filter(task => task.status?.toLowerCase() === 'completed').length;

        const pending = tasks.filter(task =>
            task.status?.toLowerCase() !== 'completed' &&
            task.status?.toLowerCase() !== 'cancelled'
        ).length;

        const overdue = tasks.filter(task => {
            if (task.status?.toLowerCase() === 'completed' || task.status?.toLowerCase() === 'cancelled') {
                return false;
            }
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate < today;
        }).length;

        const upcoming = tasks.filter(task => {
            if (task.status?.toLowerCase() === 'completed' || task.status?.toLowerCase() === 'cancelled') {
                return false;
            }
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today;
        }).length;

        return {
            total: tasks.length,
            completed,
            pending,
            overdue,
            upcoming,
            completionRate: Math.round((completed / tasks.length) * 100),
            overdueRate: pending > 0 ? Math.round((overdue / pending) * 100) : 0
        };
    }, [tasks]);

    // Render loading skeleton
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-base-100 rounded-lg shadow-md p-4 animate-pulse">
                        <div className="h-4 bg-base-300 rounded w-3/4 mb-3"></div>
                        <div className="h-6 bg-base-300 rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
            <div className="bg-base-100 rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-base-content/70">Total Tasks</p>
                        <h3 className="text-2xl font-semibold mt-1">{stats.total}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <i className="fas fa-tasks text-primary"></i>
                    </div>
                </div>
            </div>

            <div className="bg-base-100 rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-base-content/70">Completion Rate</p>
                        <h3 className="text-2xl font-semibold mt-1">{stats.completionRate}%</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                        <i className="fas fa-check text-success"></i>
                    </div>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2 mt-3">
                    <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${stats.completionRate}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-base-100 rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-base-content/70">Pending Tasks</p>
                        <h3 className="text-2xl font-semibold mt-1">{stats.pending}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                        <i className="fas fa-clock text-warning"></i>
                    </div>
                </div>
            </div>

            <div className="bg-base-100 rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-base-content/70">Overdue Tasks</p>
                        <h3 className="text-2xl font-semibold mt-1">{stats.overdue}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                        <i className="fas fa-exclamation-triangle text-error"></i>
                    </div>
                </div>
                {stats.pending > 0 && (
                    <div className="text-sm text-base-content/70 mt-2">
                        {stats.overdueRate}% of pending tasks
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskStatsSummary;