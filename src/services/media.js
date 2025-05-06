'use server';
// Media service for handling media-related API calls (files, images, videos)
import {
    findMediaById,
    findMedias,
    findFileById,
    findFiles,
    findImageById,
    findImages,
    findVideoById,
    findVideos,
    getFiles,
    getFilesByProject,
    getImages,
    getImagesByProject,
    getVideos,
    getVideosByProject
} from '@/models/wize-media/queries';

import {
    createMedia,
    updateMedia,
    deleteMedia,
    createFile,
    updateFile,
    deleteFile,
    registerFile,
    createImage,
    updateImage,
    deleteImage,
    registerImage,
    createVideo,
    updateVideo,
    deleteVideo,
    registerVideo,
    generateUploadUrl
} from '@/models/wize-media/mutations';

import { executeGraphQL, deepClean } from '@/utils/execute';
import { flattenGraphQLFilters } from '@/utils/flattenGraphQLFilters';
import { addDataContext } from '@/utils/userContext';

const service = 'wize-media';

/* General Media Operations */

/**
 * get media items with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of media items
 */
export const getMedias = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findMedias, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findMedias;
}

/**
 * get a single media item by ID
 * @param {string} id - Media ID
 * @returns {Promise<Object>} - Media details
 */
export const getMediaById = async (id) => {
    const data = await executeGraphQL(service, findMediaById, { id });
    return data.findMediaById;
}

/**
 * Create a new media item
 * @param {Object} mediaData - Media data to create
 * @returns {Promise<Object>} - Created media
 */
export const createNewMedia = async (mediaData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(mediaData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createMedia, { input: enrichedData });
    return data.createMedia;
}

/**
 * Update an existing media item
 * @param {string} id - Media ID
 * @param {Object} mediaData - Updated media data
 * @returns {Promise<Object>} - Updated media
 */
export const updateExistingMedia = async (id, mediaData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(mediaData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateMedia, { id, input: enrichedData });
    return data.updateMedia;
}

/**
 * Delete a media item
 * @param {string} id - Media ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingMedia = async (id) => {
    const data = await executeGraphQL(service, deleteMedia, { id });
    return data.deleteMedia;
}

/* File Operations */

/**
 * get file items with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of file items
 */
export const getAllFiles = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findFiles, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findFiles;
}

/**
 * Get files with simplified parameters
 * @returns {Promise<Array>} - List of files
 */
export const getFilesList = async () => {
    const data = await executeGraphQL(service, getFiles, {});
    return data.getFiles;
}

/**
 * Get files by project ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} - List of files associated with the project
 */
export const getFilesByProjectId = async (projectId) => {
    const data = await executeGraphQL(service, getFilesByProject, { projectId });
    return data.getFilesByProject;
}

/**
 * get a single file by ID
 * @param {string} id - File ID
 * @returns {Promise<Object>} - File details
 */
export const getFileById = async (id) => {
    const data = await executeGraphQL(service, findFileById, { id });
    return data.findFileById;
}

/**
 * Create a new file
 * @param {Object} fileData - File data to create
 * @returns {Promise<Object>} - Created file
 */
export const createNewFile = async (fileData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(fileData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createFile, { input: enrichedData });
    return data.createFile;
}

/**
 * Register a file in the system
 * @param {Object} fileData - File registration data
 * @returns {Promise<Object>} - Registered file
 */
export const registerNewFile = async (fileData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(fileData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, registerFile, { input: enrichedData });
    return data.registerFile;
}

/**
 * Update an existing file
 * @param {string} id - File ID
 * @param {Object} fileData - Updated file data
 * @returns {Promise<Object>} - Updated file
 */
export const updateExistingFile = async (id, fileData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(fileData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateFile, { id, input: enrichedData });
    return data.updateFile;
}

/**
 * Delete a file
 * @param {string} id - File ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingFile = async (id) => {
    const data = await executeGraphQL(service, deleteFile, { id });
    return data.deleteFile;
}

/* Image Operations */

/**
 * get image items with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of image items
 */
export const getAllImages = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findImages, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findImages;
}

/**
 * Get images with simplified parameters
 * @returns {Promise<Array>} - List of images
 */
export const getImagesList = async () => {
    const data = await executeGraphQL(service, getImages, {});
    return data.getImages;
}

/**
 * Get images by project ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} - List of images associated with the project
 */
export const getImagesByProjectId = async (projectId) => {
    const data = await executeGraphQL(service, getImagesByProject, { projectId });
    return data.getImagesByProject;
}

/**
 * get a single image by ID
 * @param {string} id - Image ID
 * @returns {Promise<Object>} - Image details
 */
export const getImageById = async (id) => {
    const data = await executeGraphQL(service, findImageById, { id });
    return data.findImageById;
}

/**
 * Create a new image
 * @param {Object} imageData - Image data to create
 * @returns {Promise<Object>} - Created image
 */
export const createNewImage = async (imageData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(imageData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createImage, { input: enrichedData });
    return data.createImage;
}

/**
 * Register an image in the system
 * @param {Object} imageData - Image registration data
 * @returns {Promise<Object>} - Registered image
 */
export const registerNewImage = async (imageData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(imageData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, registerImage, { input: enrichedData });
    return data.registerImage;
}

/**
 * Update an existing image
 * @param {string} id - Image ID
 * @param {Object} imageData - Updated image data
 * @returns {Promise<Object>} - Updated image
 */
export const updateExistingImage = async (id, imageData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(imageData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateImage, { id, input: enrichedData });
    return data.updateImage;
}

/**
 * Delete an image
 * @param {string} id - Image ID to delete
 * @returns {Promise<Object>} - Result of the deletion operation
 */
export const deleteExistingImage = async (id) => {
    const data = await executeGraphQL(service, deleteImage, { id });
    return data.deleteImage;
}

/* Video Operations */

/**
 * get video items with optional filtering, sorting and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filter - Filtering criteria
 * @param {Object} options.sort - Sorting criteria
 * @param {Object} options.paging - Pagination options
 * @returns {Promise<Array>} - List of video items
 */
export const getAllVideos = async (options = {}) => {
    const filter = options.filter || {};
    const sort = options.sort || { 'createdAt': 'DESC' };
    const paging = options.paging || { limit: 20, offset: 0 };

    const flatFilters = flattenGraphQLFilters(filter);
    const data = await executeGraphQL(service, findVideos, {
        filter: flatFilters,
        sort,
        paging,
    });

    return data.findVideos;
}

/**
 * Get videos with simplified parameters
 * @returns {Promise<Array>} - List of videos
 */
export const getVideosList = async () => {
    const data = await executeGraphQL(service, getVideos, {});
    return data.getVideos;
}

/**
 * Get videos by project ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} - List of videos associated with the project
 */
export const getVideosByProjectId = async (projectId) => {
    const data = await executeGraphQL(service, getVideosByProject, { projectId });
    return data.getVideosByProject;
}

/**
 * get a single video by ID
 * @param {string} id - Video ID
 * @returns {Promise<Object>} - Video details
 */
export const getVideoById = async (id) => {
    const data = await executeGraphQL(service, findVideoById, { id });
    return data.findVideoById;
}

/**
 * Create a new video
 * @param {Object} videoData - Video data to create
 * @returns {Promise<Object>} - Created video
 */
export const createNewVideo = async (videoData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(videoData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, createVideo, { input: enrichedData });
    return data.createVideo;
}

/**
 * Register a video in the system
 * @param {Object} videoData - Video registration data
 * @returns {Promise<Object>} - Registered video
 */
export const registerNewVideo = async (videoData) => {
    // Add user and tenant context
    const enrichedData = await addDataContext(videoData, true);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, registerVideo, { input: enrichedData });
    return data.registerVideo;
}

/**
 * Update an existing video
 * @param {string} id - Video ID
 * @param {Object} videoData - Updated video data
 * @returns {Promise<Object>} - Updated video
 */
export const updateExistingVideo = async (id, videoData) => {
    // Add user context (false = update only)
    const enrichedData = await addDataContext(videoData, false);
    await deepClean(enrichedData);
    const data = await executeGraphQL(service, updateVideo, { id, input: enrichedData });
    return data.updateVideo;
}

/* Utility Operations */

/**
 * Generate URL for uploading media files
 * @param {Object} uploadData - Data needed for generating upload URL
 * @returns {Promise<Object>} - Upload URL and other necessary information
 */
export const generateMediaUploadUrl = async (uploadData) => {
    await deepClean(uploadData);
    const data = await executeGraphQL(service, generateUploadUrl, { input: uploadData });
    return data.generateUploadUrl;
}