import { gql } from 'graphql-request';

export const onMessaging_preferenceUpdated = gql`
subscription OnMessaging_preferenceUpdated {
    onMessaging_preferenceUpdated {
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
`;
