import { gql } from 'graphql-request';

export const updateProject = gql`
mutation UpdateProject($id: String!, $input: ProjectInputInput!) {
    updateProject(id: $id, input: $input) {
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
