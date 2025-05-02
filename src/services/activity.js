/**
 * Activity service for handling user activity-related API calls
 */

// Mock data for activities
const mockActivities = [
    {
        id: 'act-001',
        user: 'Michael Chen',
        action: 'created a new project',
        subject: 'Riverside Apartments',
        type: 'project',
        projectId: 'proj-001',
        timestamp: '2025-05-01T14:30:00Z',
        details: {
            projectName: 'Riverside Apartments',
            client: 'Riverfront Developments'
        }
    },
    {
        id: 'act-002',
        user: 'Sarah Johnson',
        action: 'updated the status of',
        subject: 'Downtown Office Tower',
        type: 'project',
        projectId: 'proj-002',
        timestamp: '2025-05-01T13:15:00Z',
        details: {
            oldStatus: 'planning',
            newStatus: 'active',
            projectName: 'Downtown Office Tower'
        }
    },
    {
        id: 'act-003',
        user: 'David Smith',
        action: 'completed task',
        subject: 'Schedule electrical inspection',
        type: 'task',
        projectId: 'proj-002',
        taskId: 'task-003',
        timestamp: '2025-05-01T11:45:00Z',
        details: {
            taskTitle: 'Schedule electrical inspection for Office Tower',
            projectName: 'Downtown Office Tower'
        }
    },
    {
        id: 'act-004',
        user: 'Jennifer Wilson',
        action: 'uploaded document',
        subject: 'Site Safety Report',
        type: 'document',
        projectId: 'proj-004',
        timestamp: '2025-05-01T10:20:00Z',
        details: {
            documentType: 'report',
            projectName: 'Metro Transit Station'
        }
    },
    {
        id: 'act-005',
        user: 'Michael Chen',
        action: 'assigned task to',
        subject: 'Sarah Johnson',
        type: 'task',
        projectId: 'proj-004',
        taskId: 'task-007',
        timestamp: '2025-05-01T09:50:00Z',
        details: {
            taskTitle: 'Review safety protocols at Metro Transit site',
            assignee: 'Sarah Johnson',
            projectName: 'Metro Transit Station'
        }
    },
    {
        id: 'act-006',
        user: 'System',
        action: 'scheduled maintenance for',
        subject: 'Bulldozer D6',
        type: 'equipment',
        equipmentId: 'EQUIP-004',
        timestamp: '2025-05-01T09:00:00Z',
        details: {
            equipmentName: 'Bulldozer D6',
            maintenanceDate: '2025-05-01',
            maintenanceType: 'engine overhaul'
        }
    },
    {
        id: 'act-007',
        user: 'Michael Chen',
        action: 'created invoice for',
        subject: 'Riverfront Developments',
        type: 'financial',
        projectId: 'proj-001',
        timestamp: '2025-05-01T08:30:00Z',
        details: {
            invoiceNumber: 'INV-2025-042',
            amount: 250000,
            projectName: 'Riverside Apartments'
        }
    },
    {
        id: 'act-008',
        user: 'Sarah Johnson',
        action: 'commented on',
        subject: 'Highland Park Residential plans',
        type: 'document',
        projectId: 'proj-003',
        timestamp: '2025-04-30T16:15:00Z',
        details: {
            documentName: 'Highland Park Residential - Site Plan V2',
            comment: 'Revised layout looks good, but we should consider additional drainage for the north section.'
        }
    },
    {
        id: 'act-009',
        user: 'Jennifer Wilson',
        action: 'added new team member',
        subject: 'Robert Martinez',
        type: 'team',
        timestamp: '2025-04-30T15:00:00Z',
        details: {
            role: 'Civil Engineer',
            department: 'Engineering'
        }
    },
    {
        id: 'act-010',
        user: 'David Smith',
        action: 'created meeting for',
        subject: 'Highland Park investors',
        type: 'meeting',
        projectId: 'proj-003',
        timestamp: '2025-04-30T14:30:00Z',
        details: {
            meetingTitle: 'Highland Park Investors Update',
            date: '2025-05-02T10:00:00Z',
            location: 'Conference Room A'
        }
    }
];

/**
 * Fetch recent activities from the API
 * @param {number} limit - Maximum number of activities to return
 * @param {Object} options - Query options
 * @param {string} options.userId - Filter by user ID
 * @param {string} options.projectId - Filter by project ID
 * @param {string} options.type - Filter by activity type
 * @returns {Promise<Array>} - Promise resolving to an array of activities
 */
export const fetchActivities = async (limit = 10, options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 350));

    let filteredActivities = [...mockActivities];

    // Filter by user ID if provided
    if (options.userId) {
        filteredActivities = filteredActivities.filter(
            activity => activity.user === options.userId
        );
    }

    // Filter by project ID if provided
    if (options.projectId) {
        filteredActivities = filteredActivities.filter(
            activity => activity.projectId === options.projectId
        );
    }

    // Filter by activity type if provided
    if (options.type) {
        filteredActivities = filteredActivities.filter(
            activity => activity.type === options.type
        );
    }

    // Filter by date range if provided
    if (options.startDate && options.endDate) {
        filteredActivities = filteredActivities.filter(activity => {
            const activityDate = new Date(activity.timestamp);
            const startDate = new Date(options.startDate);
            const endDate = new Date(options.endDate);

            return activityDate >= startDate && activityDate <= endDate;
        });
    }

    // Sort by timestamp (newest first)
    filteredActivities.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Apply limit
    return filteredActivities.slice(0, limit);
};

/**
 * Create a new activity log entry
 * @param {Object} activityData - Activity data
 * @returns {Promise<Object>} - Promise resolving to the created activity
 */
export const createActivity = async (activityData) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate an ID
    const newId = `act-${String(mockActivities.length + 1).padStart(3, '0')}`;

    const newActivity = {
        id: newId,
        timestamp: new Date().toISOString(),
        ...activityData
    };

    // In a real app, this would be persisted to the backend
    // mockActivities.unshift(newActivity);

    return newActivity;
};