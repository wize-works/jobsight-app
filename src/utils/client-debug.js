'use client';

/**
 * A utility for debugging client-side code
 * This file can be imported in client components where you need breakpoints to work
 */

export function debugData(data) {
    // You can set breakpoints in this function
    console.log('🔍 DEBUG DATA:', data);
    return data; // This allows using it inline
}

export function logEvent(eventName, details) {
    // You can set breakpoints in this function
    console.log(`📊 EVENT: ${eventName}`, details);
}

export function captureError(error, context = {}) {
    // You can set breakpoints in this function
    console.error('🐞 ERROR CAPTURED:', error, context);
}