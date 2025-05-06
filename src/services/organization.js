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

// Import the organization-specific operations
import {
    getOrganizations,
    getOrganizationById,
    searchOrganizations,
    getOrganizationsByTier
} from '@/models/wize-organization/queries';

import {
    createOrganization,
    updateOrganization,
    toggleOrganizationStatus,
    deleteOrganization,
    updateSubscriptionTier
} from '@/models/wize-organization/mutations';

import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-organization';

/* Organization Operations */

/**
 * Get organizations with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of organizations
 */
export const getOrgList = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'name': 'ASC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    try {
        const data = await getOrganizations({ limit: paging.limit, offset: paging.offset });
        return data;
    } catch (error) {
        console.error('Error fetching organizations:', error);
        throw error;
    }
}

/**
 * Get a single organization by ID
 * @param {string} id - Organization ID
 * @returns {Promise<Object>} - Organization details
 */
export const getOrgById = async (id) => {
    try {
        const data = await getOrganizationById({ id });
        return data;
    } catch (error) {
        console.error(`Error fetching organization with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Search organizations by name or description
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results to return
 * @returns {Promise<Array>} - List of matching organizations
 */
export const searchOrgs = async (query, limit = 20) => {
    try {
        const data = await searchOrganizations({ query, limit });
        return data;
    } catch (error) {
        console.error('Error searching organizations:', error);
        throw error;
    }
}

/**
 * Create a new organization
 * @param {Object} orgData - Organization data
 * @returns {Promise<Object>} - Created organization
 */
export const createNewOrg = async (orgData) => {
    try {
        // Add user and tenant context
        const enrichedData = await addDataContext(orgData, true);
        await deepClean(enrichedData);
        const data = await createOrganization(enrichedData);
        return data;
    } catch (error) {
        console.error('Error creating organization:', error);
        throw error;
    }
}

/**
 * Update an existing organization
 * @param {string} id - Organization ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} - Updated organization
 */
export const updateExistingOrg = async (id, updates) => {
    try {
        // Add user context (false = update only)
        const enrichedData = await addDataContext(updates, false);
        await deepClean(enrichedData);
        const data = await updateOrganization({ id, updates: enrichedData });
        return data;
    } catch (error) {
        console.error(`Error updating organization with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Toggle an organization's active status
 * @param {string} id - Organization ID
 * @param {boolean} isActive - New active status
 * @returns {Promise<Object>} - Updated organization
 */
export const toggleOrgStatus = async (id, isActive) => {
    try {
        const data = await toggleOrganizationStatus({ id, isActive });
        return data;
    } catch (error) {
        console.error(`Error toggling status for organization with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Delete an organization
 * @param {string} id - Organization ID
 * @returns {Promise<boolean>} - Success indicator
 */
export const deleteExistingOrg = async (id) => {
    try {
        const result = await deleteOrganization({ id });
        return result;
    } catch (error) {
        console.error(`Error deleting organization with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Update an organization's subscription tier
 * @param {string} id - Organization ID
 * @param {string} tier - New subscription tier
 * @returns {Promise<Object>} - Updated organization
 */
export const updateOrgTier = async (id, tier) => {
    try {
        const data = await updateSubscriptionTier({ id, tier });
        return data;
    } catch (error) {
        console.error(`Error updating tier for organization with ID ${id}:`, error);
        throw error;
    }
}

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
    // Add user and tenant context
    const enrichedData = await addDataContext(crewData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createCrew, { input: enrichedData });
    return data.createCrew;
}

/**
 * Update an existing crew
 * @param {string} id - Crew ID
 * @param {Object} crewData - Updated crew data
 * @returns {Promise<Object>} - Updated crew
 */
export const updateExistingCrew = async (id, crewData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(crewData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateCrew, { id, input: enrichedData });
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
    // Add user and tenant context
    const enrichedData = await addDataContext(scheduleData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createCrew_schedule, { input: enrichedData });
    return data.createCrew_schedule;
}

/**
 * Update an existing crew schedule
 * @param {string} id - Crew schedule ID
 * @param {Object} scheduleData - Updated crew schedule data
 * @returns {Promise<Object>} - Updated crew schedule
 */
export const updateExistingCrewSchedule = async (id, scheduleData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(scheduleData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateCrew_schedule, { id, input: enrichedData });
    return data.updateCrew_schedule;
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
    // Add user and tenant context
    const enrichedData = await addDataContext(settingData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createSetting, { input: enrichedData });
    return data.createSetting;
}

/**
 * Update an existing organization setting
 * @param {string} id - Setting ID
 * @param {Object} settingData - Updated setting data
 * @returns {Promise<Object>} - Updated setting
 */
export const updateExistingSetting = async (id, settingData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(settingData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateSetting, { id, input: enrichedData });
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