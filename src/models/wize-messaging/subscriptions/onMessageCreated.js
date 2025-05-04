import { gql } from 'graphql-request';

export const onMessageCreated = gql`
subscription OnMessageCreated {
    onMessageCreated {
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
