'use server';
// Identity service for handling user and user_presence-related API calls
import {
    findUsers,
    findUserById,
    findUser_presences,
    findUser_presenceById
} from '@/models/wize-identity/queries';
import {
    createUser,
    updateUser,
    deleteUser,
    createUser_presence,
    updateUser_presence,
    deleteUser_presence
} from '@/models/wize-identity/mutations';
import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-identity';

/* User operations */

/**
 * get users with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of users
 */
export const getUsers = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findUsers, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findUsers;
}

/**
 * get a single user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} - User details
 */
export const getUserById = async (id) => {
    const data = await executeGraphQL(service, findUserById, { id });
    return data.findUserById;
}

/**
 * Create a new user
 * @param {Object} userData - User data to create
 * @returns {Promise<Object>} - Created user
 */
export const createNewUser = async (userData) => {
    // For users, we don't add createdBy since the user might not exist yet
    // But we still add tenant context and timestamps
    const now = new Date().toISOString();
    const enrichedData = {
        ...userData,
        createdAt: userData.createdAt || now,
        updatedAt: now,
        tenantId: userData.tenantId || process.env.TENANT_ID || '00000000-0000-0000-0000-000000000000'
    };

    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createUser, { input: enrichedData });
    return data.createUser;
}

/**
 * Update an existing user
 * @param {string} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user
 */
export const updateExistingUser = async (id, userData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(userData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateUser, { id, input: enrichedData });
    return data.updateUser;
}

/**
 * Delete a user
 * @param {string} id - User ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingUser = async (id) => {
    const data = await executeGraphQL(service, deleteUser, { id });
    return data.deleteUser;
}

/* User Presence operations */

/**
 * get user presences with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of user presences
 */
export const getUserPresences = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findUser_presences, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findUser_presences;
}

/**
 * get a single user presence by ID
 * @param {string} id - User presence ID
 * @returns {Promise<Object>} - User presence details
 */
export const getUserPresenceById = async (id) => {
    const data = await executeGraphQL(service, findUser_presenceById, { id });
    return data.findUser_presenceById;
}

/**
 * Create a new user presence
 * @param {Object} userPresenceData - User presence data to create
 * @returns {Promise<Object>} - Created user presence
 */
export const createNewUserPresence = async (userPresenceData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(userPresenceData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createUser_presence, { input: enrichedData });
    return data.createUser_presence;
}

/**
 * Update an existing user presence
 * @param {string} id - User presence ID
 * @param {Object} userPresenceData - Updated user presence data
 * @returns {Promise<Object>} - Updated user presence
 */
export const updateExistingUserPresence = async (id, userPresenceData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(userPresenceData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateUser_presence, { id, input: enrichedData });
    return data.updateUser_presence;
}

/**
 * Delete a user presence
 * @param {string} id - User presence ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingUserPresence = async (id) => {
    const data = await executeGraphQL(service, deleteUser_presence, { id });
    return data.deleteUser_presence;
}