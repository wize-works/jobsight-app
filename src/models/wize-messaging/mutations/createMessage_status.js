import { gql } from 'graphql-request';

export const createMessage_status = gql`
mutation CreateMessage_status($input: Message_statusInputInput!) {
    createMessage_status(input: $input) {
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
