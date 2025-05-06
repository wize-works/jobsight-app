import { gql } from 'graphql-request';

export const findMessages = gql`
query FindMessages($filter: MessageFilter!, $sort: MessageSort!, $paging: MessagePaging!) {
    findMessages(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
