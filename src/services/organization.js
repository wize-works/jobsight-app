'use server';
// Organization service for handling organization-related API calls
import {
    findCrews,
    findCrewById,
    findCrew_schedules,
    findCrew_scheduleById,
    findSettings,
    findSettingById
} from '@/models/wize-organization/queries';

import {
    createCrew,
    updateCrew,
    deleteCrew,
    createCrew_schedule,
    updateCrew_schedule,
    deleteCrew_schedule,
    createSetting,
    updateSetting,
    deleteSetting
} from '@/models/wize-organization/mutations';

import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';

const service = 'wize-organization';

/* Crew Operations */

/**
 * get crews with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of crews
 */
export const getCrews = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findCrews, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findCrews;
}

/**
 * get a single crew by ID
 * @param {string} id - Crew ID
 * @returns {Promise<Object>} - Crew details
 */
export const getCrewById = async (id) => {
    const data = await executeGraphQL(service, findCrewById, { id });
    return data.findCrewById;
}

/**
 * Create a new crew
 * @param {Object} crewData - Crew data to create
 * @returns {Promise<Object>} - Created crew
 */
export const createNewCrew = async (crewData) => {
    await deepClean(crewData);
    const data = await executeGraphQL(service, createCrew, { input: crewData });
    return data.createCrew;
}

/**
 * Update an existing crew
 * @param {string} id - Crew ID
 * @param {Object} crewData - Updated crew data
 * @returns {Promise<Object>} - Updated crew
 */
export const updateExistingCrew = async (id, crewData) => {
    await deepClean(crewData);
    const data = await executeGraphQL(service, updateCrew, { id, input: crewData });
    return data.updateCrew;
}

/**
 * Delete a crew
 * @param {string} id - Crew ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingCrew = async (id) => {
    const data = await executeGraphQL(service, deleteCrew, { id });
    return data.deleteCrew;
}

/* Crew Schedule Operations */

/**
 * get crew schedules with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of crew schedules
 */
export const getCrewSchedules = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findCrew_schedules, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findCrew_schedules;
}

/**
 * get a single crew schedule by ID
 * @param {string} id - Crew schedule ID
 * @returns {Promise<Object>} - Crew schedule details
 */
export const getCrewScheduleById = async (id) => {
    const data = await executeGraphQL(service, findCrew_scheduleById, { id });
    return data.findCrew_scheduleById;
}

/**
 * Create a new crew schedule
 * @param {Object} scheduleData - Crew schedule data to create
 * @returns {Promise<Object>} - Created crew schedule
 */
export const createNewCrewSchedule = async (scheduleData) => {
    await deepClean(scheduleData);
    const data = await executeGraphQL(service, createCrew_schedule, { input: scheduleData });
    return data.createCrew_schedule;
}

/**
 * Update an existing crew schedule
 * @param {string} id - Crew schedule ID
 * @param {Object} scheduleData - Updated crew schedule data
 * @returns {Promise<Object>} - Updated crew schedule
 */
export const updateExistingCrewSchedule = async (id, scheduleData) => {
    await deepClean(scheduleData);
    const data = await executeGraphQL(service, updateCrew_schedule, { id, input: scheduleData });
    return data.updateCrew_schedule;
}

/**
 * Delete a crew schedule
 * @param {string} id - Crew schedule ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingCrewSchedule = async (id) => {
    const data = await executeGraphQL(service, deleteCrew_schedule, { id });
    return data.deleteCrew_schedule;
}

/* Setting Operations */

/**
 * get organization settings with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of settings
 */
export const getSettings = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findSettings, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findSettings;
}

/**
 * get a single organization setting by ID
 * @param {string} id - Setting ID
 * @returns {Promise<Object>} - Setting details
 */
export const getSettingById = async (id) => {
    const data = await executeGraphQL(service, findSettingById, { id });
    return data.findSettingById;
}

/**
 * Create a new organization setting
 * @param {Object} settingData - Setting data to create
 * @returns {Promise<Object>} - Created setting
 */
export const createNewSetting = async (settingData) => {
    await deepClean(settingData);
    const data = await executeGraphQL(service, createSetting, { input: settingData });
    return data.createSetting;
}

/**
 * Update an existing organization setting
 * @param {string} id - Setting ID
 * @param {Object} settingData - Updated setting data
 * @returns {Promise<Object>} - Updated setting
 */
export const updateExistingSetting = async (id, settingData) => {
    await deepClean(settingData);
    const data = await executeGraphQL(service, updateSetting, { id, input: settingData });
    return data.updateSetting;
}

/**
 * Delete an organization setting
 * @param {string} id - Setting ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingSetting = async (id) => {
    const data = await executeGraphQL(service, deleteSetting, { id });
    return data.deleteSetting;
}