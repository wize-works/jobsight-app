export const flattenGraphQLFilters = (filters) => {
    const output = {};

    for (const [field, value] of Object.entries(filters)) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Handle nested operators like { status: { in: [...] } }
            for (const [operator, operand] of Object.entries(value)) {
                output[`${field}_${operator}`] = operand;
            }
        } else {
            // Handle non-nested filters like { status: "planning" }
            output[field] = value;
        }
    }

    return output;
}
