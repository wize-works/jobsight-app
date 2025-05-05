import { gql } from 'graphql-request';

export const findProjectById = gql`
query FindProjectById($id: ID!) {
    findProjectById(id: $id) {
        _id
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
