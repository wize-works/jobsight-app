import { gql } from 'graphql-request';

export const updateProject = gql`
mutation UpdateProject($id: String!, $input: ProjectInputInput!) {
    updateProject(id: $id, input: $input) {
          id
        name
        description
        status
        startDate
        endDate
        location
        tags
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
