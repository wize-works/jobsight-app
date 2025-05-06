import { gql } from 'graphql-request';

export const deleteMessage = gql`
mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id) {
        _id
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
