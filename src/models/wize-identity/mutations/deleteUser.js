import { gql } from 'graphql-request';

export const deleteUser = gql`
mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
          _id
        organizationId
        role
        displayName
        email
        avatarUrl
        isActive
        createdAt
        updatedAt
    }
  }
`;
