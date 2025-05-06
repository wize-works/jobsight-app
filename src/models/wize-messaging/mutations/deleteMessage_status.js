import { gql } from 'graphql-request';

export const deleteMessage_status = gql`
mutation DeleteMessage_status($id: ID!) {
    deleteMessage_status(id: $id) {
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
