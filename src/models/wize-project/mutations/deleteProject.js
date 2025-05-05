import { gql } from 'graphql-request';

export const deleteProject = gql`
mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
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
