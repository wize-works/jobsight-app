import { gql } from 'graphql-request';

export const deleteUser_presence = gql`
mutation DeleteUser_presence($id: ID!) {
    deleteUser_presence(id: $id) {
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
