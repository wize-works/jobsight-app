import { gql } from 'graphql-request';

export const onMessage_statusCreated = gql`
subscription OnMessage_statusCreated {
    onMessage_statusCreated {
          _id
        id
        messageId
        userId
        isRead
        readAt
        isDelivered
        deliveredAt
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
