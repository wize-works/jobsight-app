import { gql } from 'graphql-request';

export const findMessaging_preferences = gql`
query FindMessaging_preferences($filter: Messaging_preferenceFilter!, $sort: Messaging_preferenceSort!, $paging: Messaging_preferencePaging!) {
    findMessaging_preferences(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            userId
            notificationSettings
            conversationSettings
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
