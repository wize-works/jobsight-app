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
    fetchProjects,
    fetchTasks,
    fetchEquipment,
    fetchFinancialSummary,
    fetchActivities,
    fetchAiSuggestions,
    updateTask
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
                    fetchProjects(),
                    fetchTasks(),
                    fetchEquipment(),
                    fetchFinancialSummary(),
                    fetchActivities(4),
                    fetchAiSuggestions()
                ]);

                // Only update state if component is still mounted
                if (mounted) {
                    setDashboardData({
                        projects: projectsData,
                        tasks: tasksData,
                        equipment: equipmentData,
                        financialSummary: financialData,
                        activities: activitiesData,
                        aiSuggestions: suggestionsData
                    });

                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (mounted) {
                    toast({
                        title: "Error",
                        description: "Failed to load dashboard data",
                        variant: "destructive",
                    });
                    setIsLoading(false);
                }
            }
        };

        fetchAllData();

        // Cleanup function to prevent state updates after unmount
        return () => {
            mounted = false;
        };
    }, [toast]);

    // Destructure data for easier access
    const { projects, tasks, equipment, financialSummary, activities, aiSuggestions } = dashboardData;

    // Get today's tasks
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasksDueToday = tasks.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= todayStart && dueDate <= todayEnd;
    });

    // Calculate equipment status percentage
    const activeEquipment = equipment.filter(item => item.status === 'active' || item.status === 'available').length;
    const equipmentStatusPercentage = equipment.length > 0
        ? Math.round((activeEquipment / equipment.length) * 100)
        : 0;

    // Financial data for overview
    const financialData = {
        revenue: financialSummary.revenue || 0,
        expenses: financialSummary.expenses || 0,
        profit: financialSummary.profit || 0,
        revenueChange: 14, // Mock data for UI presentation
        expensesChange: 7,  // Mock data for UI presentation
        profitChange: 23    // Mock data for UI presentation
    };

    // Task handling
    const handleMarkCompleteTask = async (taskId) => {
        try {
            await updateTask(taskId, { status: 'completed' });
            toast({
                title: "Task completed",
                description: "The task has been marked as completed",
            });

            // Only update the tasks without triggering a full reload
            const updatedTasks = await fetchTasks();
            setDashboardData(prevData => ({
                ...prevData,
                tasks: updatedTasks
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
        router.push("/finances");
    };

    return (
        <main className="flex-1 overflow-x-auto p-4 lg:p-6 bg-base-200">

            {/* Use skeleton loaders or static layout to prevent layout shifts */}
            <div className="animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                        title="Equipment Issues"
                        value={isLoading ? "-" : `${Math.round((equipment.filter(e => e.inUse).length / equipment.length) * 100)}%`}
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

                <ProjectsTable
                    projects={projects}
                    loading={isLoading}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <TasksList
                        tasks={tasksDueToday}
                        onMarkComplete={handleMarkCompleteTask}
                        onEdit={handleEditTask}
                        onViewAll={navigateToTasks}
                        loading={isLoading}
                    />

                    <EquipmentTable
                        equipment={equipment.slice(0, 4)}
                        onManageEquipment={navigateToEquipment}
                        loading={isLoading}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <FinancialOverview
                        data={financialData}
                        loading={isLoading}
                    />

                    <AIAssistant
                        suggestions={aiSuggestions}
                        insight="Based on current progress, Riverside Apartments project is ahead of schedule by 2 days. Material costs are 3% under budget."
                        loading={isLoading}
                    />
                </div>

                <RecentActivity
                    activities={activities}
                    onViewAll={() => console.log("View all activities")}
                    loading={isLoading}
                />
            </div>
        </main>
    );
};

export default Dashboard;
