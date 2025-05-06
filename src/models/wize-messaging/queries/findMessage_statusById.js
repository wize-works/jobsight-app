import { gql } from 'graphql-request';

export const findMessage_statusById = gql`
query FindMessage_statusById($id: ID!) {
    findMessage_statusById(id: $id) {
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
