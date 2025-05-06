'use server';
// Inventory service for handling inventory-related API calls
// This service acts as a higher-level service that incorporates equipment operations
// and can be expanded to include other inventory types in the future
import {
    getEquipments,
    getEquipmentById,
    createNewEquipment,
    updateExistingEquipment,
    deleteExistingEquipment
} from './equipment';

// Re-export equipment operations
export {
    getEquipments,
    getEquipmentById,
    createNewEquipment,
    updateExistingEquipment,
    deleteExistingEquipment
};

/**
 * Get all inventory items (currently only equipment)
 * This function can be expanded to include other inventory types in the future
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of inventory items
 */
export const getInventoryItems = async (options = {}) => {
    // Currently, this just returns equipment items
    // In the future, this could get different types of inventory items and combine them
    return await getEquipments(options);
};

/**
 * Get inventory statistics
 * @returns {Promise<Object>} - Inventory statistics
 */
export const getInventoryStats = async () => {
    const equipmentItems = await getEquipments({});

    // Calculate basic statistics
    const stats = {
        totalItems: equipmentItems.length,
        equipmentCount: equipmentItems.length,
        // Add more statistics as needed
    };

    return stats;
};

/**
 * Search across all inventory types
 * @param {string} searchTerm - The term to search for
 * @param {Object} options - Additional search options
 * @returns {Promise<Object>} - Search results grouped by inventory type
 */
export const searchInventory = async (searchTerm, options = {}) => {
    const filter = {
        OR: [
            { name: { contains: searchTerm } },
            { description: { contains: searchTerm } },
            // Add more searchable fields as needed
        ]
    };

    const equipmentResults = await getEquipments({
        filter,
        ...options
    });

    return {
        equipment: equipmentResults,
        // Add more inventory types here as they become available
    };
};