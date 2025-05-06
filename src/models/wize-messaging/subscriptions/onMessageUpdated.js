import { gql } from 'graphql-request';

export const onMessageUpdated = gql`
subscription OnMessageUpdated {
    onMessageUpdated {
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
