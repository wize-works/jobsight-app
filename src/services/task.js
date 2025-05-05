'use server';
// Task service for handling task-related API calls
import { findTasks, findTaskById } from '@/models/wize-task/queries';
import { createTask, updateTask, deleteTask } from '@/models/wize-task/mutations';
import { executeGraphQL } from '@/services/execute';
import { flattenGraphQLFilters } from './utils';

const service = 'wize-task';

/**
 * Fetch tasks with optional filtering, sorting and pagination
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
 * Fetch a single task by ID
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
    const data = await executeGraphQL(service, createTask, { input: taskData });
    return data.createTask;
}

/**
 * Update an existing task
 * @param {string} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} - Updated task
 */
export const updateExistingTask = async (id, taskData) => {
    const data = await executeGraphQL(service, updateTask, { id, input: taskData });
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