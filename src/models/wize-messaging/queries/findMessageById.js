import { gql } from 'graphql-request';

export const findMessageById = gql`
query FindMessageById($id: ID!) {
    findMessageById(id: $id) {
          _id
        id
        conversationId
        senderId
        text
        attachments
        isSystemMessage
        metadata
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
