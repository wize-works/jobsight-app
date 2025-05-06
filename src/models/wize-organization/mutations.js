import { supabase } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create a new organization
 * @param {Object} params - Organization data
 * @param {string} params.name - Organization name
 * @param {string} [params.description] - Organization description
 * @param {string} [params.logoUrl] - URL to organization logo
 * @param {string} [params.website] - Organization website URL
 * @param {string} [params.industry] - Industry sector
 * @param {Object} [params.address] - Organization address
 * @param {string} [params.contactEmail] - Primary contact email
 * @param {string} [params.contactPhone] - Primary contact phone number
 * @param {Object} [params.settings] - Organization settings
 * @param {string} [params.subscriptionTier="free"] - Subscription tier
 * @returns {Promise<Object>} Created organization object
 */
export const createOrganization = async ({
    name,
    description = null,
    logoUrl = null,
    website = null,
    industry = null,
    address = null,
    contactEmail = null,
    contactPhone = null,
    settings = {},
    subscriptionTier = 'free'
}) => {
    try {
        if (!name) {
            throw new Error('Organization name is required');
        }

        const newOrganization = {
            id: uuidv4(),
            name,
            description,
            logoUrl,
            website,
            industry,
            address,
            contactEmail,
            contactPhone,
            settings,
            subscriptionTier,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('organizations')
            .insert(newOrganization)
            .select('*')
            .single();

        if (error) {
            console.error('Error creating organization:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in createOrganization:', error);
        throw error;
    }
};

/**
 * Update an existing organization
 * @param {Object} params - Update parameters
 * @param {string} params.id - Organization ID
 * @param {Object} params.updates - Fields to update
 * @returns {Promise<Object>} Updated organization object
 */
export const updateOrganization = async ({ id, updates }) => {
    try {
        if (!id) {
            throw new Error('Organization ID is required');
        }

        if (!updates || Object.keys(updates).length === 0) {
            throw new Error('No updates provided');
        }

        // Add updatedAt timestamp
        const updatedData = {
            ...updates,
            updatedAt: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('organizations')
            .update(updatedData)
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            console.error(`Error updating organization with ID ${id}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in updateOrganization:', error);
        throw error;
    }
};

/**
 * Toggle organization active status
 * @param {Object} params - Parameters
 * @param {string} params.id - Organization ID
 * @param {boolean} params.isActive - New active status
 * @returns {Promise<Object>} Updated organization object
 */
export const toggleOrganizationStatus = async ({ id, isActive }) => {
    try {
        if (!id) {
            throw new Error('Organization ID is required');
        }

        if (isActive === undefined) {
            throw new Error('isActive status is required');
        }

        const { data, error } = await supabase
            .from('organizations')
            .update({
                isActive,
                updatedAt: new Date().toISOString()
            })
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            console.error(`Error updating organization status with ID ${id}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in toggleOrganizationStatus:', error);
        throw error;
    }
};

/**
 * Delete an organization
 * @param {Object} params - Delete parameters
 * @param {string} params.id - Organization ID
 * @returns {Promise<boolean>} Success indicator
 */
export const deleteOrganization = async ({ id }) => {
    try {
        if (!id) {
            throw new Error('Organization ID is required');
        }

        const { error } = await supabase
            .from('organizations')
            .delete()
            .eq('id', id);

        if (error) {
            console.error(`Error deleting organization with ID ${id}:`, error);
            throw error;
        }

        return true;
    } catch (error) {
        console.error('Error in deleteOrganization:', error);
        throw error;
    }
};

/**
 * Update organization subscription tier
 * @param {Object} params - Parameters
 * @param {string} params.id - Organization ID
 * @param {string} params.tier - New subscription tier
 * @returns {Promise<Object>} Updated organization object
 */
export const updateSubscriptionTier = async ({ id, tier }) => {
    try {
        if (!id) {
            throw new Error('Organization ID is required');
        }

        if (!tier) {
            throw new Error('Subscription tier is required');
        }

        const { data, error } = await supabase
            .from('organizations')
            .update({
                subscriptionTier: tier,
                updatedAt: new Date().toISOString()
            })
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            console.error(`Error updating organization tier with ID ${id}:`, error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in updateSubscriptionTier:', error);
        throw error;
    }
};