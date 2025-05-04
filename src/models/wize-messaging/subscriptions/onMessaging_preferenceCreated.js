import { gql } from 'graphql-request';

export const onMessaging_preferenceCreated = gql`
subscription OnMessaging_preferenceCreated {
    onMessaging_preferenceCreated {
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
