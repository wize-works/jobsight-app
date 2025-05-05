'use server';
// Project service for handling project-related API calls
import { findProjects, findProjectById } from '@/models/wize-project/queries';
import { createProject, updateProject, deleteProject } from '@/models/wize-project/mutations';
import { executeGraphQL } from '@/services/execute';
import { flattenGraphQLFilters } from './utils';

const service = 'wize-project';

/**
 * Fetch projects with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of projects
 */
export const getProjects = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findProjects, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findProjects;
}

/**
 * Fetch a single project by ID
 * @param {string} id - Project ID
 * @returns {Promise<Object>} - Project details
 */
export const getProjectById = async (id) => {
    const data = await executeGraphQL(service, findProjectById, { id });
    return data.findProjectById;
}

/**
 * Create a new project
 * @param {Object} projectData - Project data to create
 * @returns {Promise<Object>} - Created project
 */
export const createNewProject = async (projectData) => {
    const data = await executeGraphQL(service, createProject, { input: projectData });
    return data.createProject;
}

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} - Updated project
 */
export const updateExistingProject = async (id, projectData) => {
    const data = await executeGraphQL(service, updateProject, { id, input: projectData });
    return data.updateProject;
}

/**
 * Delete a project
 * @param {string} id - Project ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingProject = async (id) => {
    const data = await executeGraphQL(service, deleteProject, { id });
    return data.deleteProject;
}
