import { gql } from 'graphql-request';

export const findMessage_statuses = gql`
query FindMessage_statuses($filter: Message_statusFilter!, $sort: Message_statusSort!, $paging: Message_statusPaging!) {
    findMessage_statuses(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
