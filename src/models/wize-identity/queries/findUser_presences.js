import { gql } from 'graphql-request';

export const findUser_presences = gql`
query FindUser_presences($filter: User_presenceFilter!, $sort: User_presenceSort!, $paging: User_presencePaging!) {
    findUser_presences(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            userId
            status
            lastActive
            currentConversationId
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
