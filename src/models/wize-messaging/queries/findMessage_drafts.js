import { gql } from 'graphql-request';

export const findMessage_drafts = gql`
query FindMessage_drafts($filter: Message_draftFilter!, $sort: Message_draftSort!, $paging: Message_draftPaging!) {
    findMessage_drafts(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            id
            userId
            conversationId
            text
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
