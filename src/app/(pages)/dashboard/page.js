'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import StatCard from "./components/StatCard";
import ProjectsTable from "./components/ProjectsTable";
import TasksList from "./components/TasksList";
import EquipmentTable from "./components/EquipmentTable";
import FinancialOverview from "./components/FinancialOverview";
import AIAssistant from "./components/AIAssistant";
import RecentActivity from "./components/RecentActivity";
import {
    getProjects,
    getTasks,
    getEquipments,
    getFinancialSummary,
    getActivities,
    getAiSuggestions,
    updateExistingTask
} from "@/services";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    // State for data
    const [dashboardData, setDashboardData] = useState({
        projects: [],
        tasks: [],
        equipment: [],
        financialSummary: { revenue: 0, expenses: 0, profit: 0 },
        activities: [],
        aiSuggestions: []
    });

    // Use a single loading state for the entire dashboard
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all dashboard data
    useEffect(() => {
        let mounted = true;

        const fetchAllData = async () => {
            try {
                // Run all fetch operations in parallel
                const [
                    projectsData,
                    tasksData,
                    equipmentData,
                    financialData,
                    activitiesData,
                    suggestionsData
                ] = await Promise.all([
                    getProjects().then(data => data || []),
                    getTasks().then(data => data || []),
                    getEquipments().then(data => data || []),
                    getFinancialSummary().then(data => data || { revenue: 0, expenses: 0, profit: 0 }),
                    getActivities(4).then(data => data || []),
                    getAiSuggestions().then(data => data || [])
                ]);

                // Only update state if component is still mounted
                if (mounted) {
                    setDashboardData({
                        projects: projectsData || [],
                        tasks: tasksData || [],
                        equipment: equipmentData || [],
                        financialSummary: financialData || { revenue: 0, expenses: 0, profit: 0 },
                        activities: activitiesData || [],
                        aiSuggestions: suggestionsData || []
                    });

                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchAllData();

        // Cleanup function to prevent state updates after unmount
        return () => {
            mounted = false;
        };
    }, []);

    // Destructure data for easier access and ensure they are arrays
    const {
        projects = [],
        tasks = [],
        equipment = [],
        financialSummary = { revenue: 0, expenses: 0, profit: 0 },
        activities = [],
        aiSuggestions = []
    } = dashboardData;

    // Get today's tasks
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasksDueToday = Array.isArray(tasks) ? tasks.filter(task => {
        if (!task?.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= todayStart && dueDate <= todayEnd;
    }) : [];

    // Calculate equipment status percentage
    const activeEquipment = Array.isArray(equipment) ? equipment.filter(item => item?.status === 'active' || item?.status === 'available').length : 0;
    const equipmentStatusPercentage = Array.isArray(equipment) && equipment.length > 0
        ? Math.round((activeEquipment / equipment.length) * 100)
        : 0;

    // Financial data for overview
    const financialData = {
        revenue: financialSummary?.revenue || 0,
        expenses: financialSummary?.expenses || 0,
        profit: financialSummary?.profit || 0,
        revenueChange: 14, // Mock data for UI presentation
        expensesChange: 7,  // Mock data for UI presentation
        profitChange: 23    // Mock data for UI presentation
    };

    // Get first 4 equipment items safely
    const displayEquipment = Array.isArray(equipment) ? equipment.slice(0, 4) : [];

    // Task handling
    const handleMarkCompleteTask = async (taskId) => {
        try {
            await updateExistingTask(taskId, { status: 'completed' });
            toast({
                title: "Task completed",
                description: "The task has been marked as completed",
            });

            // Update tasks after marking one as complete
            const updatedTasksData = await getTasks().then(data => data || []);
            setDashboardData(prevData => ({
                ...prevData,
                tasks: updatedTasksData
            }));
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update task status",
                variant: "destructive",
            });
        }
    };

    const handleEditTask = (taskId) => {
        router.push(`/tasks/${taskId}`);
    };

    // Navigation handlers
    const navigateToNewProject = () => {
        router.push("/projects/new");
    };

    const navigateToProjects = () => {
        router.push("/projects");
    };

    const navigateToTasks = () => {
        router.push("/tasks");
    };

    const navigateToEquipment = () => {
        router.push("/equipment");
    };

    const navigateToFinances = () => {
        router.push("/invoicing");
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            {/* Use skeleton loaders or static layout to prevent layout shifts */}
            <div className="animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                    <StatCard
                        title="Active Projects"
                        value={isLoading ? "-" : `${projects.length}`}
                        change={8}
                        color="primary"
                        icon={<i className="far fa-building fa-lg" />}
                    />
                    <StatCard
                        title="Tasks Due Today"
                        value={isLoading ? "-" : `${tasksDueToday.length}`}
                        change={-2}
                        color="secondary"
                        icon={<i className="far fa-tasks fa-lg" />}
                    />
                    <StatCard
                        title="Equipment Status"
                        value={isLoading ? "-" : `${equipmentStatusPercentage}%`}
                        change={5}
                        color="accent"
                        icon={<i className="far fa-tools fa-lg" />}
                    />
                    <StatCard
                        title="Monthly Revenue"
                        value={isLoading ? "-" : `$${financialData.revenue.toLocaleString()}`}
                        change={12}
                        color="neutral"
                        icon={<i className="far fa-chart-line fa-lg" />}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 bg-base-200 rounded-t-lg">
                    <h2 className="text-base sm:text-lg font-semibold">Recent Projects</h2>
                    <button className="btn btn-primary btn-sm w-full sm:w-auto" onClick={navigateToNewProject}>Add New Project</button>
                </div>
                <div className="card bg-base-100 shadow-lg mb-4 sm:mb-6">
                    <div className="card-body p-3 sm:p-4 lg:p-6">
                        <ProjectsTable
                            projects={projects}
                            loading={isLoading}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                    <TasksList
                        tasks={tasksDueToday}
                        onMarkComplete={handleMarkCompleteTask}
                        onEdit={handleEditTask}
                        onViewAll={navigateToTasks}
                        loading={isLoading}
                    />

                    <EquipmentTable
                        equipment={displayEquipment}
                        onManageEquipment={navigateToEquipment}
                        loading={isLoading}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                    <FinancialOverview
                        data={financialData}
                        loading={isLoading}
                    />

                    <RecentActivity
                        activities={activities}
                        onViewAll={() => router.push("/logs")}
                        loading={isLoading}
                    />

                    <AIAssistant
                        suggestions={aiSuggestions}
                        insight="Based on current progress, Riverside Apartments project is ahead of schedule by 2 days. Material costs are 3% under budget."
                        loading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
