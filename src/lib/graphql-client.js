'use server';
/**
 * GraphQL client utility for making authenticated requests to Wize API services
 */

/**
 * Make an authenticated GraphQL request to a specific Wize API service
 * @param {string} service - The Wize service name (e.g., 'wize-project', 'wize-finance')
 * @param {string} query - The GraphQL query/mutation string from .graphql file
 * @param {Object} variables - Variables for the GraphQL operation
 * @returns {Promise<Object>} - The response data from the GraphQL API
 */
export async function graphqlRequest(service, query, variables = {}) {
    throw new Error('graphqlRequest is deprecated. Use executeGraphQL instead.');
    let apiUrl = `https://api.wize.works/${service}/graphql`;

    try {
        const response = await get(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': process.env.WIZE_API_KEY || '',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('GraphQL Error:', result.errors);
            throw new Error(
                result.errors[0]?.message || 'An error occurred while geting data'
            );
        }

        return result.data;
    } catch (error) {
        console.error(`Error in ${service} API request:`, error);
        throw error;
    }
}

/**
 * Import a GraphQL document from a .graphql file
 * @param {string} rawDocument - The raw GraphQL document string
 * @returns {Promise<string>} - Cleaned GraphQL document
 */
export async function gql(rawDocument) {
    // This basic implementation just returns the raw document
    // In a more advanced setup, you might want to add more processing
    return rawDocument;
}