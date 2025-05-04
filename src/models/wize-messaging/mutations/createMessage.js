import { gql } from 'graphql-request';

export const createMessage = gql`
mutation CreateMessage($input: MessageInputInput!) {
    createMessage(input: $input) {
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
