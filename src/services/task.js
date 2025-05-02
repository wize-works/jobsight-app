/**
 * Task service for handling task-related API calls
 */

// Mock data for tasks
const mockTasks = [
    {
        id: 'task-001',
        title: 'Review structural plans for Riverside Apartments',
        description: 'Analyze and approve the revised structural plans for the main building.',
        projectId: 'proj-001',
        status: 'pending',
        priority: 'high',
        assignedTo: 'Michael Chen',
        createdBy: 'Jennifer Wilson',
        createdAt: '2025-04-15T08:00:00Z',
        updatedAt: '2025-04-15T08:00:00Z',
        dueDate: '2025-05-02T15:00:00Z',
        tags: ['structural', 'review', 'approval']
    },
    {
        id: 'task-002',
        title: 'Order concrete for foundation pouring',
        description: 'Place order for 150 cubic yards of concrete for the foundation work next week.',
        projectId: 'proj-001',
        status: 'pending',
        priority: 'urgent',
        assignedTo: 'David Smith',
        createdBy: 'Michael Chen',
        createdAt: '2025-04-30T14:30:00Z',
        updatedAt: '2025-04-30T14:30:00Z',
        dueDate: '2025-05-02T12:00:00Z',
        tags: ['material', 'order', 'foundation']
    },
    {
        id: 'task-003',
        title: 'Schedule electrical inspection for Office Tower',
        description: 'Coordinate with city inspector for electrical work approval on floors 5-8.',
        projectId: 'proj-002',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Sarah Johnson',
        createdBy: 'Sarah Johnson',
        createdAt: '2025-04-20T09:15:00Z',
        updatedAt: '2025-05-01T11:30:00Z',
        dueDate: '2025-05-01T16:00:00Z',
        tags: ['inspection', 'electrical', 'regulatory']
    },
    {
        id: 'task-004',
        title: 'Finalize HVAC plans for Transit Station',
        description: 'Complete the review and approval of HVAC system design for all levels.',
        projectId: 'proj-004',
        status: 'pending',
        priority: 'normal',
        assignedTo: 'Jennifer Wilson',
        createdBy: 'Michael Chen',
        createdAt: '2025-04-28T13:00:00Z',
        updatedAt: '2025-04-28T13:00:00Z',
        dueDate: '2025-05-02T17:00:00Z',
        tags: ['hvac', 'design', 'approval']
    },
    {
        id: 'task-005',
        title: 'Meet with Highland Park investors',
        description: 'Present progress report and updated timeline to key stakeholders.',
        projectId: 'proj-003',
        status: 'pending',
        priority: 'high',
        assignedTo: 'David Smith',
        createdBy: 'David Smith',
        createdAt: '2025-04-25T10:00:00Z',
        updatedAt: '2025-04-25T10:00:00Z',
        dueDate: '2025-05-02T10:00:00Z',
        tags: ['meeting', 'investors', 'reporting']
    },
    {
        id: 'task-006',
        title: 'Prepare weekly progress report',
        description: 'Compile and submit construction progress and milestone achievements for all active projects.',
        projectId: null,
        status: 'pending',
        priority: 'normal',
        assignedTo: 'Michael Chen',
        createdBy: 'Jennifer Wilson',
        createdAt: '2025-05-01T09:00:00Z',
        updatedAt: '2025-05-01T09:00:00Z',
        dueDate: '2025-05-02T16:00:00Z',
        tags: ['reporting', 'administrative', 'weekly']
    },
    {
        id: 'task-007',
        title: 'Review safety protocols at Metro Transit site',
        description: 'Conduct inspection and verify compliance with updated safety requirements.',
        projectId: 'proj-004',
        status: 'pending',
        priority: 'urgent',
        assignedTo: 'Sarah Johnson',
        createdBy: 'Michael Chen',
        createdAt: '2025-05-01T11:30:00Z',
        updatedAt: '2025-05-01T11:30:00Z',
        dueDate: '2025-05-02T14:00:00Z',
        tags: ['safety', 'compliance', 'inspection']
    }
];

/**
 * Fetch tasks from the API
 * @param {Object} options - Query options
 * @param {string} options.projectId - Filter tasks by project ID
 * @param {string} options.status - Filter tasks by status
 * @param {string} options.priority - Filter tasks by priority
 * @param {string} options.assignedTo - Filter tasks by assigned user
 * @returns {Promise<Array>} - Promise resolving to an array of tasks
 */
export const fetchTasks = async (options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // Apply filters (simulating GraphQL query filters)
    let filteredTasks = [...mockTasks];

    if (options.projectId) {
        filteredTasks = filteredTasks.filter(task => task.projectId === options.projectId);
    }

    if (options.status) {
        filteredTasks = filteredTasks.filter(task => task.status === options.status);
    }

    if (options.priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === options.priority);
    }

    if (options.assignedTo) {
        filteredTasks = filteredTasks.filter(task => task.assignedTo === options.assignedTo);
    }

    // Filter by due date range if provided
    if (options.dueDateFrom && options.dueDateTo) {
        const fromDate = new Date(options.dueDateFrom);
        const toDate = new Date(options.dueDateTo);

        filteredTasks = filteredTasks.filter(task => {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate >= fromDate && taskDueDate <= toDate;
        });
    }

    // Apply limit if provided
    if (options.limit && options.limit > 0) {
        filteredTasks = filteredTasks.slice(0, options.limit);
    }

    return filteredTasks;
};

/**
 * Fetch a single task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object>} - Promise resolving to a task object
 */
export const fetchTaskById = async (id) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const task = mockTasks.find(t => t.id === id);

    if (!task) {
        throw new Error(`Task with ID ${id} not found`);
    }

    return task;
};

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @returns {Promise<Object>} - Promise resolving to the created task
 */
export const createTask = async (taskData) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Generate a new ID
    const newId = `task-${String(mockTasks.length + 1).padStart(3, '0')}`;

    const now = new Date().toISOString();

    const newTask = {
        id: newId,
        ...taskData,
        createdAt: now,
        updatedAt: now,
        status: taskData.status || 'pending'
    };

    // In a real app, this would be persisted to the backend
    // mockTasks.push(newTask);

    return newTask;
};

/**
 * Update an existing task
 * @param {string} id - Task ID to update
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} - Promise resolving to the updated task
 */
export const updateTask = async (id, taskData) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const taskIndex = mockTasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task with ID ${id} not found`);
    }

    const updatedTask = {
        ...mockTasks[taskIndex],
        ...taskData,
        updatedAt: new Date().toISOString()
    };

    // In a real app, this would update the backend
    // mockTasks[taskIndex] = updatedTask;

    return updatedTask;
};

/**
 * Delete a task
 * @param {string} id - Task ID to delete
 * @returns {Promise<boolean>} - Promise resolving to true if deletion was successful
 */
export const deleteTask = async (id) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const taskIndex = mockTasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task with ID ${id} not found`);
    }

    // In a real app, this would delete from the backend
    // mockTasks.splice(taskIndex, 1);

    return true;
};