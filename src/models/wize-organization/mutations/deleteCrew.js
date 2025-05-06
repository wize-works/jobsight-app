import { gql } from 'graphql-request';

export const deleteCrew = gql`
mutation DeleteCrew($id: ID!) {
    deleteCrew(id: $id) {
        _id
        name
        members
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
