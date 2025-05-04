import { gql } from 'graphql-request';

export const createUser_presence = gql`
mutation CreateUser_presence($input: User_presenceInputInput!) {
    createUser_presence(input: $input) {
          _id
        userId
        status
        lastActive
        currentConversationId
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
