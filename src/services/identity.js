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
    await deepClean(userData);
    const data = await executeGraphQL(service, createUser, { input: userData });
    return data.createUser;
}

/**
 * Update an existing user
 * @param {string} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user
 */
export const updateExistingUser = async (id, userData) => {
    await deepClean(userData);
    const data = await executeGraphQL(service, updateUser, { id, input: userData });
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
    await deepClean(userPresenceData);
    const data = await executeGraphQL(service, createUser_presence, { input: userPresenceData });
    return data.createUser_presence;
}

/**
 * Update an existing user presence
 * @param {string} id - User presence ID
 * @param {Object} userPresenceData - Updated user presence data
 * @returns {Promise<Object>} - Updated user presence
 */
export const updateExistingUserPresence = async (id, userPresenceData) => {
    await deepClean(userPresenceData);
    const data = await executeGraphQL(service, updateUser_presence, { id, input: userPresenceData });
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