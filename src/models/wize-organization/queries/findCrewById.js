import { gql } from 'graphql-request';

export const findCrewById = gql`
query FindCrewById($id: ID!) {
    findCrewById(id: $id) {
          _id
        id
        name
        members
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
