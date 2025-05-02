/**
 * Services index file to export all API functions
 */

// Export project service functions
export {
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject
} from './project';

// Export task service functions
export {
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask
} from './task';

// Export equipment service functions
export {
    fetchEquipment,
    fetchEquipmentById,
    updateEquipmentStatus,
    assignEquipment,
    scheduleMaintenance
} from './equipment';

// Export financial service functions
export {
    fetchFinancialSummary,
    fetchTransactions
} from './financial';

// Export activity service functions
export {
    fetchActivities,
    createActivity
} from './activity';

// Export AI assistant service functions
export {
    fetchAiSuggestions,
    generateProjectInsights,
    markSuggestionActedUpon
} from './ai-assistant';