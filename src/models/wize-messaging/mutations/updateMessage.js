import { gql } from 'graphql-request';

export const updateMessage = gql`
mutation UpdateMessage($id: String!, $input: MessageInputInput!) {
    updateMessage(id: $id, input: $input) {
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
