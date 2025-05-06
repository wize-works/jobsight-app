'use server';
// Project service for handling project-related API calls
import { findProjects, findProjectById, findPermits, findPermitById } from '@/models/wize-project/queries';
import {
    createProject,
    updateProject,
    deleteProject,
    createPermit,
    updatePermit,
    deletePermit
} from '@/models/wize-project/mutations';
import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-project';

/* Project Operations */

/**
 * get projects with optional filtering, sorting and pagination
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
 * get a single project by ID
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
    // Add user and tenant context
    const enrichedData = await addDataContext(projectData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createProject, { input: enrichedData });
    return data.createProject;
}

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} - Updated project
 */
export const updateExistingProject = async (id, projectData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(projectData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateProject, { id, input: enrichedData });
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

/* Permit Operations */

/**
 * get permits with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of permits
 */
export const getPermits = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findPermits, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findPermits;
}

/**
 * get a single permit by ID
 * @param {string} id - Permit ID
 * @returns {Promise<Object>} - Permit details
 */
export const getPermitById = async (id) => {
    const data = await executeGraphQL(service, findPermitById, { id });
    return data.findPermitById;
}

/**
 * Create a new permit
 * @param {Object} permitData - Permit data to create
 * @returns {Promise<Object>} - Created permit
 */
export const createNewPermit = async (permitData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(permitData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createPermit, { input: enrichedData });
    return data.createPermit;
}

/**
 * Update an existing permit
 * @param {string} id - Permit ID
 * @param {Object} permitData - Updated permit data
 * @returns {Promise<Object>} - Updated permit
 */
export const updateExistingPermit = async (id, permitData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(permitData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updatePermit, { id, input: enrichedData });
    return data.updatePermit;
}

/**
 * Delete a permit
 * @param {string} id - Permit ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingPermit = async (id) => {
    const data = await executeGraphQL(service, deletePermit, { id });
    return data.deletePermit;
}
