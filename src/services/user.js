'use server';

import { currentUser, auth } from "@clerk/nextjs/server";
import {
    getUserById,
    createNewUser,
    updateExistingUser,
    getUserPresenceById,
    createNewUserPresence,
    updateExistingUserPresence
} from './identity';

/**
 * Gets the current authenticated user information from Clerk and syncs with database
 * @returns {Promise<Object>} The current user object
 */
export async function getCurrentUser() {
    try {
        // Get user from Clerk
        const clerkUser = await currentUser();

        if (!clerkUser) {
            return null;
        }

        // Get user data from our database using Clerk ID
        let dbUser = await getUserById(clerkUser.id);

        // If user doesn't exist in our database, create it
        if (!dbUser) {
            const userData = {
                id: clerkUser.id,
                organizationId: process.env.DEFAULT_ORGANIZATION_ID || 'default', // Replace with your org ID logic
                role: 'worker', // Default role, can be updated later
                displayName: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
                email: clerkUser.emailAddresses[0]?.emailAddress,
                avatarUrl: clerkUser.imageUrl,
                isActive: true
            };

            dbUser = await createNewUser(userData);
        }

        // Return merged data (preference to our DB data, with Clerk fields where needed)
        return {
            id: dbUser.id,
            organizationId: dbUser.organizationId,
            role: dbUser.role,
            displayName: dbUser.displayName,
            email: dbUser.email,
            avatarUrl: dbUser.avatarUrl || clerkUser.imageUrl,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            isActive: dbUser.isActive
        };
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}

/**
 * Gets the user's session information including authentication status
 * @returns {Promise<Object>} Session information
 */
export async function getUserSession() {
    try {
        const { userId } = auth();

        if (!userId) {
            return { isAuthenticated: false };
        }

        const user = await getCurrentUser();
        return {
            isAuthenticated: true,
            userId,
            user,
        };
    } catch (error) {
        console.error("Error getting user session:", error);
        return { isAuthenticated: false };
    }
}

/**
 * Updates a user's online status in the database
 * @param {string} userId - The user's ID
 * @param {string} status - The user's status ('online', 'away', 'offline')
 * @param {string} [conversationId] - Optional ID of conversation the user is viewing
 * @returns {Promise<Object>} - Updated user presence
 */
export async function updateUserPresence(userId, status, conversationId = null) {
    if (!userId) return null;

    try {
        // Check if user presence exists
        let userPresence = await getUserPresenceById(userId);

        const now = new Date().toISOString();
        const presenceData = {
            status: status,
            lastActive: now,
            currentConversationId: conversationId,
            tenantId: process.env.TENANT_ID || '00000000-0000-0000-0000-000000000000',
            updatedAt: now
        };

        // Create or update user presence
        if (!userPresence) {
            presenceData.userId = userId;
            presenceData.createdAt = now;
            presenceData.createdBy = userId;

            userPresence = await createNewUserPresence(presenceData);
        } else {
            presenceData.updatedBy = userId;
            userPresence = await updateExistingUserPresence(userId, presenceData);
        }

        return userPresence;
    } catch (error) {
        console.error("Error updating user presence:", error);
        return null;
    }
}

/**
 * Gets a user's presence information from the database
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} The user's presence information
 */
export async function getUserPresence(userId) {
    if (!userId) return { status: 'offline' };

    try {
        const presence = await getUserPresenceById(userId);
        if (!presence) return { status: 'offline' };

        return presence;
    } catch (error) {
        console.error("Error getting user presence:", error);
        return { status: 'offline' };
    }
}

/**
 * Updates the current user's conversation context
 * @param {string} conversationId - The ID of the conversation being viewed
 * @returns {Promise<Object>} - Updated user presence
 */
export async function updateCurrentConversation(conversationId) {
    try {
        const { userId } = auth();
        if (!userId) return null;

        return await updateUserPresence(userId, 'online', conversationId);
    } catch (error) {
        console.error("Error updating current conversation:", error);
        return null;
    }
}

/**
 * Sets up presence tracking for the current user
 * Call this function on app initialization (e.g., in a useEffect)
 * @returns {Function} Cleanup function to call when component unmounts
 */
export const setupPresenceTracking = async () => {
    return async () => {
        try {
            const { userId } = auth();
            if (!userId) return;

            // Set user as online
            await updateUserPresence(userId, 'online');

            // Set up event listeners for page visibility changes
            if (typeof window !== 'undefined') {
                const handleVisibilityChange = async () => {
                    const status = document.visibilityState === 'visible' ? 'online' : 'away';
                    await updateUserPresence(userId, status);
                };

                document.addEventListener('visibilitychange', handleVisibilityChange);

                // Set up beforeunload handler to mark user as offline when leaving
                const handleBeforeUnload = async () => {
                    await updateUserPresence(userId, 'offline');
                };

                window.addEventListener('beforeunload', handleBeforeUnload);

                // Return cleanup function
                return () => {
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                    // Mark user as offline when component unmounts
                    updateUserPresence(userId, 'offline');
                };
            }
        } catch (error) {
            console.error("Error setting up presence tracking:", error);
        }
    };
}

// Add this function to sync users at login
export async function syncUserWithDatabase() {
    try {
        const user = await currentUser();

        // If user is not logged in, there's nothing to sync
        if (!user) return null;

        // Check if the user exists in our database
        let dbUser;
        try {
            dbUser = await getUserById(user.id);
        } catch (error) {
            console.error("Error checking for existing user:", error);
        }

        // If user doesn't exist in our database, create them
        if (!dbUser) {
            console.log(`User ${user.id} exists in Clerk but not in our database. Creating...`);
            try {
                // Get primary email
                const primaryEmailId = user.primaryEmailAddressId;
                const primaryEmail = user.emailAddresses?.find(email => email.id === primaryEmailId);
                const emailAddress = primaryEmail?.emailAddress;

                // Create user data
                const userData = {
                    id: user.id,
                    organizationId: process.env.DEFAULT_ORGANIZATION_ID || 'default',
                    email: emailAddress,
                    displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                    avatarUrl: user.imageUrl,
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    role: 'worker', // Default role
                    isActive: true,
                    createdAt: new Date(user.createdAt).toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                // Create the user in our database
                const newUser = await createNewUser(userData);
                console.log(`Successfully created user in database for Clerk user: ${user.id}`);
                return newUser;
            } catch (error) {
                console.error("Error creating user in database:", error);
                return null;
            }
        }

        return dbUser;
    } catch (error) {
        console.error("Error in syncUserWithDatabase:", error);
        return null;
    }
}