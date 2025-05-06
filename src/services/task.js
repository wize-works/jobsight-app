'use server';
// Task service for handling task-related API calls
import { findTasks, findTaskById } from '@/models/wize-task/queries';
import { createTask, updateTask, deleteTask } from '@/models/wize-task/mutations';
import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext, addUserContext } from '@/utils/userContext';
import { auth } from '@clerk/nextjs/server';

const service = 'wize-task';

/**
 * Format date strings properly for GraphQL
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} - Properly formatted date string
 */
const formatDateForGraphQL = (dateInput) => {
    if (!dateInput) return null;

    try {
        // Create a Date object from the input
        const date = new Date(dateInput);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.warn(`Invalid date input: ${dateInput}`);
            return null;
        }

        // For "date" type fields (not datetime), use YYYY-MM-DD format
        // This matches what GraphQL expects for Date scalar type
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error(`Error formatting date: ${error.message}`);
        return null;
    }
};

/**
 * get tasks with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of tasks
 */
export const getTasks = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findTasks, {
        filter: flatFilters,
        sort,
        paging,
    });
    return data.findTasks;
}

/**
 * get a single task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object>} - Task details
 */
export const getTaskById = async (id) => {
    const data = await executeGraphQL(service, findTaskById, { id });
    return data.findTaskById;
}

/**
 * Create a new task
 * @param {Object} taskData - Task data to create
 * @returns {Promise<Object>} - Created task
 */
export const createNewTask = async (taskData) => {
    // Format the date before submission
    if (taskData.dueDate) {
        taskData.dueDate = formatDateForGraphQL(taskData.dueDate);
    }

    // Add user and tenant context
    const enrichedData = await addDataContext(taskData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createTask, { input: enrichedData });
    return data.createTask;
}

/**
 * Update an existing task
 * @param {string} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} - Updated task
 */
export const updateExistingTask = async (id, taskData) => {
    // Format the date before submission
    if (taskData.dueDate) {
        taskData.dueDate = formatDateForGraphQL(taskData.dueDate);
    }

    // Add user context (false = update only)
    const enrichedData = await addDataContext(taskData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateTask, { id, input: enrichedData });
    return data.updateTask;
}

/**
 * Delete a task
 * @param {string} id - Task ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingTask = async (id) => {
    const data = await executeGraphQL(service, deleteTask, { id });
    return data.deleteTask;
}

/**
 * Add a comment to a task
 * @param {string} taskId - Task ID
 * @param {Object} commentData - Comment data with content
 * @returns {Promise<Object>} - Updated task with new comment
 */
export const addTaskComment = async (taskId, commentData) => {
    // Fetch the current task first
    const task = await getTaskById(taskId);

    if (!task) {
        throw new Error(`Task with ID ${taskId} not found`);
    }

    // Get the current user ID
    const { userId } = auth();
    if (!userId) {
        throw new Error('User not authenticated');
    }

    // Create a new comment object with required fields
    const newComment = {
        id: crypto.randomUUID(), // Generate a new ID for the comment
        content: commentData.content,
        createdBy: userId,
        createdByName: commentData.createdByName || '',
        createdAt: new Date().toISOString(),
    };

    // Merge the new comment with existing comments or create a new array
    const updatedComments = [...(task.comments || []), newComment];

    // Update the task with the new comments array
    return await updateExistingTask(taskId, { comments: updatedComments });
};

/**
 * Add a subtask to a task
 * @param {string} taskId - Task ID
 * @param {Object} subtaskData - Subtask data with title
 * @returns {Promise<Object>} - Updated task with new subtask
 */
export const addSubtask = async (taskId, subtaskData) => {
    const task = await getTaskById(taskId);

    if (!task) {
        throw new Error(`Task with ID ${taskId} not found`);
    }

    const newSubtask = {
        title: subtaskData.title,
        completed: subtaskData.completed || false,
    };

    const updatedSubtasks = [...(task.subtasks || []), newSubtask];

    return await updateExistingTask(taskId, { subtasks: updatedSubtasks });
};

/**
 * Update a subtask's completed status
 * @param {string} taskId - Task ID
 * @param {number} subtaskIndex - Index of subtask to update
 * @param {boolean} completed - New completed status
 * @returns {Promise<Object>} - Updated task
 */
export const updateSubtaskStatus = async (taskId, subtaskIndex, completed) => {
    const task = await getTaskById(taskId);

    if (!task || !task.subtasks || subtaskIndex >= task.subtasks.length) {
        throw new Error(`Task or subtask not found`);
    }

    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[subtaskIndex] = {
        ...updatedSubtasks[subtaskIndex],
        completed
    };

    return await updateExistingTask(taskId, { subtasks: updatedSubtasks });
};

/**
 * Add an attachment to a task
 * @param {string} taskId - Task ID
 * @param {Object} attachmentData - Attachment data with filename, url, and size
 * @returns {Promise<Object>} - Updated task with new attachment
 */
export const addTaskAttachment = async (taskId, attachmentData) => {
    const task = await getTaskById(taskId);

    if (!task) {
        throw new Error(`Task with ID ${taskId} not found`);
    }

    const newAttachment = {
        filename: attachmentData.filename,
        url: attachmentData.url,
        size: attachmentData.size || '',
    };

    const updatedAttachments = [...(task.attachments || []), newAttachment];

    return await updateExistingTask(taskId, { attachments: updatedAttachments });
};

/**
 * Get tasks for a specific project
 * @param {string} projectId - Project ID
 * @param {Object} options - Optional query parameters
 * @returns {Promise<Array>} - List of tasks for the project
 */
export const getTasksByProject = async (projectId, options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'orderIndex': 'ASC' };
    const paging = options.paging || { limit: 100, offset: 0 };

    // Add project filter
    const projectFilter = {
        ...filter,
        projectId: {
            eq: projectId
        }
    };

    return await getTasks({
        filter: projectFilter,
        sort,
        paging
    });
};