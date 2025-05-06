import { supabase } from '../../lib/db';

/**
 * Get all organizations
 * @param {Object} params - Query parameters
 * @param {number} [params.limit=100] - Maximum number of records to return
 * @param {number} [params.offset=0] - Number of records to skip
 * @returns {Promise<Array>} Array of organization objects
 */
export const getOrganizations = async ({ limit = 100, offset = 0 } = {}) => {
    try {
        const { data, error } = await supabase
            .from('organizations')
            .select('*')
            .range(offset, offset + limit - 1)
            .order('name');

        if (error) {
            console.error('Error fetching organizations:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in getOrganizations:', error);
        throw error;
    }
};

/**
 * Get an organization by ID
 * @param {Object} params - Query parameters
 * @param {string} params.id - Organization ID
 * @returns {Promise<Object>} Organization object
 */
export const getOrganizationById = async ({ id }) => {
    try {
        if (!id) {
            throw new Error('Organization ID is required');
        }

        const { data, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching organization with ID ${id}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in getOrganizationById:', error);
        throw error;
    }
};

/**
 * Search organizations by name or other fields
 * @param {Object} params - Query parameters
 * @param {string} params.query - Search query
 * @param {number} [params.limit=20] - Maximum number of records to return
 * @returns {Promise<Array>} Array of matching organization objects
 */
export const searchOrganizations = async ({ query, limit = 20 } = {}) => {
    try {
        if (!query) {
            throw new Error('Search query is required');
        }

        const { data, error } = await supabase
            .from('organizations')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%,industry.ilike.%${query}%`)
            .limit(limit);

        if (error) {
            console.error('Error searching organizations:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in searchOrganizations:', error);
        throw error;
    }
};

/**
 * Get organizations by subscription tier
 * @param {Object} params - Query parameters
 * @param {string} params.tier - Subscription tier
 * @param {number} [params.limit=100] - Maximum number of records to return
 * @returns {Promise<Array>} Array of organization objects
 */
export const getOrganizationsByTier = async ({ tier, limit = 100 } = {}) => {
    try {
        if (!tier) {
            throw new Error('Subscription tier is required');
        }

        const { data, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('subscriptionTier', tier)
            .limit(limit);

        if (error) {
            console.error(`Error fetching organizations with tier ${tier}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in getOrganizationsByTier:', error);
        throw error;
    }
};