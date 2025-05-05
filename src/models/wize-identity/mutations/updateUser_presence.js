import { gql } from 'graphql-request';

export const updateUser_presence = gql`
mutation UpdateUser_presence($id: String!, $input: User_presenceInputInput!) {
    updateUser_presence(id: $id, input: $input) {
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
