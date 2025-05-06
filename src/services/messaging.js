'use server';
// Messaging service for handling messaging-related API calls
import {
    findConversations,
    findConversationById,
    findMessages,
    findMessageById,
    findMessage_drafts,
    findMessage_draftById,
    findMessage_statuses,
    findMessage_statusById,
    findMessaging_preferences,
    findMessaging_preferenceById
} from '@/models/wize-messaging/queries';

import {
    createConversation,
    updateConversation,
    deleteConversation,
    createMessage,
    updateMessage,
    deleteMessage,
    createMessage_draft,
    updateMessage_draft,
    deleteMessage_draft,
    createMessage_status,
    updateMessage_status,
    deleteMessage_status,
    createMessaging_preference,
    updateMessaging_preference,
    deleteMessaging_preference
} from '@/models/wize-messaging/mutations';

import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-messaging';

/* Conversation Operations */

/**
 * get conversations with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of conversations
 */
export const getConversations = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findConversations, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findConversations;
}

/**
 * get a single conversation by ID
 * @param {string} id - Conversation ID
 * @returns {Promise<Object>} - Conversation details
 */
export const getConversationById = async (id) => {
    const data = await executeGraphQL(service, findConversationById, { id });
    return data.findConversationById;
}

/**
 * Create a new conversation
 * @param {Object} conversationData - Conversation data to create
 * @returns {Promise<Object>} - Created conversation
 */
export const createNewConversation = async (conversationData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(conversationData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createConversation, { input: enrichedData });
    return data.createConversation;
}

/**
 * Update an existing conversation
 * @param {string} id - Conversation ID
 * @param {Object} conversationData - Updated conversation data
 * @returns {Promise<Object>} - Updated conversation
 */
export const updateExistingConversation = async (id, conversationData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(conversationData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateConversation, { id, input: enrichedData });
    return data.updateConversation;
}

/**
 * Delete a conversation
 * @param {string} id - Conversation ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingConversation = async (id) => {
    const data = await executeGraphQL(service, deleteConversation, { id });
    return data.deleteConversation;
}

/* Message Operations */

/**
 * get messages with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of messages
 */
export const getMessages = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findMessages, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findMessages;
}

/**
 * get a single message by ID
 * @param {string} id - Message ID
 * @returns {Promise<Object>} - Message details
 */
export const getMessageById = async (id) => {
    const data = await executeGraphQL(service, findMessageById, { id });
    return data.findMessageById;
}

/**
 * Create a new message
 * @param {Object} messageData - Message data to create
 * @returns {Promise<Object>} - Created message
 */
export const createNewMessage = async (messageData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(messageData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createMessage, { input: enrichedData });
    return data.createMessage;
}

/**
 * Update an existing message
 * @param {string} id - Message ID
 * @param {Object} messageData - Updated message data
 * @returns {Promise<Object>} - Updated message
 */
export const updateExistingMessage = async (id, messageData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(messageData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateMessage, { id, input: enrichedData });
    return data.updateMessage;
}

/* Message Draft Operations */

/**
 * get message drafts with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of message drafts
 */
export const getMessageDrafts = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findMessage_drafts, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findMessage_drafts;
}

/**
 * get a single message draft by ID
 * @param {string} id - Message draft ID
 * @returns {Promise<Object>} - Message draft details
 */
export const getMessageDraftById = async (id) => {
    const data = await executeGraphQL(service, findMessage_draftById, { id });
    return data.findMessage_draftById;
}

/**
 * Create a new message draft
 * @param {Object} draftData - Message draft data to create
 * @returns {Promise<Object>} - Created message draft
 */
export const createNewMessageDraft = async (draftData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(draftData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createMessage_draft, { input: enrichedData });
    return data.createMessage_draft;
}

/**
 * Update an existing message draft
 * @param {string} id - Message draft ID
 * @param {Object} draftData - Updated message draft data
 * @returns {Promise<Object>} - Updated message draft
 */
export const updateExistingMessageDraft = async (id, draftData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(draftData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateMessage_draft, { id, input: enrichedData });
    return data.updateMessage_draft;
}

/* Message Status Operations */

/**
 * get message statuses with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of message statuses
 */
export const getMessageStatuses = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findMessage_statuses, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findMessage_statuses;
}

/**
 * get a single message status by ID
 * @param {string} id - Message status ID
 * @returns {Promise<Object>} - Message status details
 */
export const getMessageStatusById = async (id) => {
    const data = await executeGraphQL(service, findMessage_statusById, { id });
    return data.findMessage_statusById;
}

/**
 * Create a new message status
 * @param {Object} statusData - Message status data to create
 * @returns {Promise<Object>} - Created message status
 */
export const createNewMessageStatus = async (statusData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(statusData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createMessage_status, { input: enrichedData });
    return data.createMessage_status;
}

/**
 * Update an existing message status
 * @param {string} id - Message status ID
 * @param {Object} statusData - Updated message status data
 * @returns {Promise<Object>} - Updated message status
 */
export const updateExistingMessageStatus = async (id, statusData) => {
    // Add user context (false = update only) 
    const enrichedData = await addDataContext(statusData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateMessage_status, { id, input: enrichedData });
    return data.updateMessage_status;
}

/* Messaging Preference Operations */

/**
 * get messaging preferences with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of messaging preferences
 */
export const getMessagingPreferences = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findMessaging_preferences, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findMessaging_preferences;
}

/**
 * get a single messaging preference by ID
 * @param {string} id - Messaging preference ID
 * @returns {Promise<Object>} - Messaging preference details
 */
export const getMessagingPreferenceById = async (id) => {
    const data = await executeGraphQL(service, findMessaging_preferenceById, { id });
    return data.findMessaging_preferenceById;
}

/**
 * Create a new messaging preference
 * @param {Object} preferenceData - Messaging preference data to create
 * @returns {Promise<Object>} - Created messaging preference
 */
export const createNewMessagingPreference = async (preferenceData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(preferenceData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createMessaging_preference, { input: enrichedData });
    return data.createMessaging_preference;
}

/**
 * Update an existing messaging preference
 * @param {string} id - Messaging preference ID
 * @param {Object} preferenceData - Updated messaging preference data
 * @returns {Promise<Object>} - Updated messaging preference
 */
export const updateExistingMessagingPreference = async (id, preferenceData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(preferenceData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateMessaging_preference, { id, input: enrichedData });
    return data.updateMessaging_preference;
}