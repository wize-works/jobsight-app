import { gql } from 'graphql-request';

export const findUser_presenceById = gql`
query FindUser_presenceById($id: ID!) {
    findUser_presenceById(id: $id) {
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
