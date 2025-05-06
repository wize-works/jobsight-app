'use server';
// Equipment service for handling equipment-related API calls
import { findEquipments, findEquipmentById } from '@/models/wize-inventory/queries';
import { createEquipment, updateEquipment, deleteEquipment } from '@/models/wize-inventory/mutations';
import { deepClean, executeGraphQL } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-inventory';

/**
 * get equipment items with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of equipment items
 */
export const getEquipments = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findEquipments, {
        filter: flatFilters,
        sort,
        paging,
    });
    return data.findEquipments;
}

/**
 * get a single equipment item by ID
 * @param {string} id - Equipment ID
 * @returns {Promise<Object>} - Equipment details
 */
export const getEquipmentById = async (id) => {
    const data = await executeGraphQL(service, findEquipmentById, { id });
    return data.findEquipmentById;
}

/**
 * Create a new equipment item
 * @param {Object} equipmentData - Equipment data to create
 * @returns {Promise<Object>} - Created equipment
 */
export const createNewEquipment = async (equipmentData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(equipmentData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createEquipment, { input: enrichedData });
    return data.createEquipment;
}

/**
 * Update an existing equipment item
 * @param {string} id - Equipment ID
 * @param {Object} equipmentData - Updated equipment data
 * @returns {Promise<Object>} - Updated equipment
 */
export const updateExistingEquipment = async (id, equipmentData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(equipmentData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateEquipment, { id, input: enrichedData });
    return data.updateEquipment;
}

/**
 * Delete an equipment item
 * @param {string} id - Equipment ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingEquipment = async (id) => {
    const data = await executeGraphQL(service, deleteEquipment, { id });
    return data.deleteEquipment;
}