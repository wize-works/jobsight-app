import { gql } from 'graphql-request';

export const updateMessage_status = gql`
mutation UpdateMessage_status($id: String!, $input: Message_statusInputInput!) {
    updateMessage_status(id: $id, input: $input) {
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
