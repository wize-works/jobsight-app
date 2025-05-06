import { gql } from 'graphql-request';

export const onMessage_statusUpdated = gql`
subscription OnMessage_statusUpdated {
    onMessage_statusUpdated {
        _id
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
