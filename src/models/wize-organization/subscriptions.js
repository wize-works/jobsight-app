import { supabase } from '../../lib/db';

/**
 * Subscribe to all organization changes
 * @param {Object} params - Subscription parameters
 * @param {Function} params.onOrganizationChange - Callback function for changes
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToOrganizations = ({ onOrganizationChange }) => {
    try {
        if (typeof onOrganizationChange !== 'function') {
            throw new Error('onOrganizationChange must be a function');
        }

        const subscription = supabase
            .channel('organization-changes')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'organizations'
                },
                (payload) => {
                    onOrganizationChange(payload);
                }
            )
            .subscribe();

        return {
            unsubscribe: () => {
                subscription.unsubscribe();
            }
        };
    } catch (error) {
        console.error('Error in subscribeToOrganizations:', error);
        throw error;
    }
};

/**
 * Subscribe to changes for a specific organization
 * @param {Object} params - Subscription parameters
 * @param {string} params.organizationId - Organization ID to watch
 * @param {Function} params.onChange - Callback function for changes
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToOrganizationById = ({ organizationId, onChange }) => {
    try {
        if (!organizationId) {
            throw new Error('Organization ID is required');
        }

        if (typeof onChange !== 'function') {
            throw new Error('onChange must be a function');
        }

        const subscription = supabase
            .channel(`organization-${organizationId}`)
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'organizations',
                    filter: `id=eq.${organizationId}`
                },
                (payload) => {
                    onChange(payload);
                }
            )
            .subscribe();

        return {
            unsubscribe: () => {
                subscription.unsubscribe();
            }
        };
    } catch (error) {
        console.error('Error in subscribeToOrganizationById:', error);
        throw error;
    }
};

/**
 * Subscribe to organization status changes
 * @param {Object} params - Subscription parameters
 * @param {Function} params.onStatusChange - Callback for status changes
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToOrganizationStatusChanges = ({ onStatusChange }) => {
    try {
        if (typeof onStatusChange !== 'function') {
            throw new Error('onStatusChange must be a function');
        }

        const subscription = supabase
            .channel('organization-status-changes')
            .on('postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'organizations',
                    filter: 'isActive=is.changed'
                },
                (payload) => {
                    onStatusChange(payload);
                }
            )
            .subscribe();

        return {
            unsubscribe: () => {
                subscription.unsubscribe();
            }
        };
    } catch (error) {
        console.error('Error in subscribeToOrganizationStatusChanges:', error);
        throw error;
    }
};