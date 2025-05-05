import { gql } from 'graphql-request';

export const createProject = gql`
mutation CreateProject($input: ProjectInputInput!) {
    createProject(input: $input) {
        name
        description
        client
        status
        startDate
        endDate
        location
        budget
        currency
        progress
        tags
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
}
`;
