import { gql } from 'graphql-request';

export const findUserById = gql`
query FindUserById($id: ID!) {
    findUserById(id: $id) {
          _id
        id
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
