import { gql } from 'graphql-request';

export const findConversations = gql`
query FindConversations($filter: ConversationFilter!, $sort: ConversationSort!, $paging: ConversationPaging!) {
    findConversations(filter: $filter, sort: $sort, paging: $paging) {
        count
        data {
            _id
            type
            name
            participants
            projectId
            isArchived
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
  }
`;
