import { gql } from 'graphql-request';

export const updateUser = gql`
mutation UpdateUser($id: String!, $input: UserInputInput!) {
    updateUser(id: $id, input: $input) {
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
