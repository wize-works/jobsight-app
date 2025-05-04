import { gql } from 'graphql-request';

export const deleteProject = gql`
mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
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
