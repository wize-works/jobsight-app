import { gql } from 'graphql-request';

export const createProject = gql`
mutation CreateProject($input: ProjectInputInput!) {
    createProject(input: $input) {
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
