'use server';

import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Adds the current user ID to an object as createdBy and updatedBy fields
 * @param {Object} data - The data object to add user context to
 * @param {boolean} isNew - Whether this is a new record (add createdBy) or update (only updatedBy)
 * @returns {Object} The data object with user context added
 */
export async function addUserContext(data, isNew = true) {
    try {
        // Try to get userId via auth() first
        let { userId } = auth();

        // If that doesn't work, try getting it from currentUser
        if (!userId) {
            const user = await currentUser();
            userId = user?.id;
        }

        // If we still don't have a userId, log a warning and return original data
        if (!userId) {
            console.warn("No authenticated user found when adding user context");
            return data;
        }

        console.log(`Adding user context with userId: ${userId}`);

        const now = new Date().toISOString();
        const result = { ...data };

        // Always add updatedBy and updatedAt
        result.updatedBy = userId;
        result.updatedAt = now;

        // Only add createdBy and createdAt for new records
        if (isNew) {
            result.createdBy = userId;
            result.createdAt = now;
        }

        return result;
    } catch (error) {
        console.error("Error adding user context:", error);
        console.error(error.stack);  // Log the full error stack for debugging
        return data;
    }
}

/**
 * Adds user context to an object
 * @param {Object} data - The data object to add context to
 * @param {boolean} isNew - Whether this is a new record
 * @returns {Object} The data object with user context added
 */
export async function addDataContext(data, isNew = true) {
    return await addUserContext(data, isNew);
}