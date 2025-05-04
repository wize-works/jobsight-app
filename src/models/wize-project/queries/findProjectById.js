import { gql } from 'graphql-request';

export const findProjectById = gql`
query FindProjectById($id: ID!) {
    findProjectById(id: $id) {
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
