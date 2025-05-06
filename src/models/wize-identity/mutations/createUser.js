import { gql } from 'graphql-request';

export const createUser = gql`
mutation CreateUser($input: UserInputInput!) {
    createUser(input: $input) {
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
