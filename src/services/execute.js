'use server';

//const API_URL = 'https://api.wize.works/wize-project/graphql';
//const API_URL = 'http://localhost:3005/graphql';
const API_KEY = process.env.WIZE_API_KEY;

function sanitizeVariables(input, metadata = {}) {
    const isEmptyObject = (obj) =>
        typeof obj === 'object' &&
        obj !== null &&
        Object.keys(obj).length === 0;

    const isEmptyArrayOfObjects = (arr) =>
        Array.isArray(arr) &&
        arr.length > 0 &&
        arr.every(item => typeof item === 'object' && Object.keys(item).length === 0);

    const result = {};

    for (const [key, value] of Object.entries(input)) {
        const fieldDef = metadata.fields?.[key] || {};
        const type = fieldDef.type;

        // Coerce number fields
        if ((type === 'int' || type === 'number') && typeof value === 'string') {
            const coerced = Number(value);
            result[key] = isNaN(coerced) ? null : coerced;
        }

        // Remove empty objects or arrays of empty objects
        else if (isEmptyObject(value) || isEmptyArrayOfObjects(value)) {
            continue;
        }

        // Convert "" to null if optional
        else if (value === '' && !fieldDef.required) {
            result[key] = null;
        }

        // Otherwise just assign
        else {
            result[key] = value;
        }
    }

    return result;
}
export const deepClean = async (value) => {
    if (Array.isArray(value)) {
        return value
            .map(deepClean)
            .filter(
                v =>
                    v !== null &&
                    v !== undefined &&
                    (typeof v !== 'object' || Object.keys(v).length > 0)
            );
    }

    if (typeof value === 'object' && value !== null) {
        const cleaned = Object.fromEntries(
            Object.entries(value)
                .map(([k, v]) => [k, deepClean(v)])
                .filter(([_, v]) => v !== '' && v !== undefined && v !== null)
        );

        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }

    return value;
}

/**
 * Makes a GraphQL request to the project service
 * @param {string} query - GraphQL query or mutation
 * @param {Object} variables - Variables for the GraphQL operation
 * @returns {Promise<Object>} - Response data
 */
export const executeGraphQL = async (service, query, variables = {}) => {
    try {
        let API_URL = `https://api.wize.works/${service}/graphql`;
        // if (service === 'wize-log') {
        //     API_URL = `http://localhost:3001/graphql`;
        // }
        const body = JSON.stringify({
            query: query,
            variables: variables, //deepClean(variables),
        });
        console.log('Body', body);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': API_KEY,
            },
            body: body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Project API request failed');
        }
        const { data, errors } = await response.json();
        if (errors && errors.length > 0) {
            throw new Error(errors[0].message || 'GraphQL operation failed');
        }

        return data;
    } catch (error) {
        console.error('Project service error:', error);
        throw error;
    }
}