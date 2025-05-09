'use server';
// Log service for handling log-related API calls
import {
    findDailies,
    findDailyById,
    findAi_logs,
    findAi_logById,
    findVector_logs,
    findVector_logById
} from '@/models/wize-log/queries';
import {
    createDaily,
    updateDaily,
    deleteDaily,
    createAi_log,
    updateAi_log,
    deleteAi_log,
    createVector_log,
    updateVector_log,
    deleteVector_log
} from '@/models/wize-log/mutations';
import { deepClean, executeGraphQL } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-log';

/**
 * ============= DAILY LOGS =============
 */

/**
 * get daily logs with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of daily logs
 */
export const getDailyLogs = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);

    const data = await executeGraphQL(service, findDailies, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findDailies;
}

/**
 * get a single daily log by ID
 * @param {string} id - Daily log ID
 * @returns {Promise<Object>} - Daily log details
 */
export const getDailyLogById = async (id) => {
    const data = await executeGraphQL(service, findDailyById, { id });
    return data.findDailyById;
}

/**
 * Create a new daily log
 * @param {Object} dailyLogData - Daily log data to create
 * @returns {Promise<Object>} - Created daily log
 */
export const createDailyLog = async (dailyLogData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(dailyLogData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createDaily, { input: enrichedData });
    return data.createDaily;
}

/**
 * Update an existing daily log
 * @param {string} id - Daily log ID
 * @param {Object} dailyLogData - Updated daily log data
 * @returns {Promise<Object>} - Updated daily log
 */
export const updateDailyLog = async (id, dailyLogData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(dailyLogData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateDaily, { id, input: enrichedData });
    return data.updateDaily;
}

/**
 * Delete a daily log
 * @param {string} id - Daily log ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteDailyLog = async (id) => {
    const data = await executeGraphQL(service, deleteDaily, { id });
    return data.deleteDaily;
}

/**
 * ============= AI LOGS =============
 */

/**
 * get AI logs with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of AI logs
 */
export const getAiLogs = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const data = await executeGraphQL(findAi_logs, {
        filter,
        sort,
        paging,
    });

    return data.findAi_logs;
}

/**
 * get a single AI log by ID
 * @param {string} id - AI log ID
 * @returns {Promise<Object>} - AI log details
 */
export const getAiLogById = async (id) => {
    const data = await executeGraphQL(findAi_logById, { id });
    return data.findAi_logById;
}

/**
 * Create a new AI log
 * @param {Object} aiLogData - AI log data to create
 * @returns {Promise<Object>} - Created AI log
 */
export const createAiLog = async (aiLogData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(aiLogData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createAi_log, { input: enrichedData });
    return data.createAi_log;
}

/**
 * Update an existing AI log
 * @param {string} id - AI log ID
 * @param {Object} aiLogData - Updated AI log data
 * @returns {Promise<Object>} - Updated AI log
 */
export const updateAiLog = async (id, aiLogData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(aiLogData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateAi_log, { id, input: enrichedData });
    return data.updateAi_log;
}

/**
 * Delete an AI log
 * @param {string} id - AI log ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteAiLog = async (id) => {
    const data = await executeGraphQL(deleteAi_log, { id });
    return data.deleteAi_log;
}

/**
 * ============= VECTOR LOGS =============
 */

/**
 * get vector logs with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of vector logs
 */
export const getVectorLogs = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const data = await executeGraphQL(findVector_logs, {
        filter,
        sort,
        paging,
    });

    return data.findVector_logs;
}

/**
 * get a single vector log by ID
 * @param {string} id - Vector log ID
 * @returns {Promise<Object>} - Vector log details
 */
export const getVectorLogById = async (id) => {
    const data = await executeGraphQL(findVector_logById, { id });
    return data.findVector_logById;
}

/**
 * Create a new vector log
 * @param {Object} vectorLogData - Vector log data to create
 * @returns {Promise<Object>} - Created vector log
 */
export const createVectorLog = async (vectorLogData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(vectorLogData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createVector_log, { input: enrichedData });
    return data.createVector_log;
}

/**
 * Update an existing vector log
 * @param {string} id - Vector log ID
 * @param {Object} vectorLogData - Updated vector log data
 * @returns {Promise<Object>} - Updated vector log
 */
export const updateVectorLog = async (id, vectorLogData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(vectorLogData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateVector_log, { id, input: enrichedData });
    return data.updateVector_log;
}