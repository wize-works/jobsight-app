import { gql } from 'graphql-request';

export const createMessaging_preference = gql`
mutation CreateMessaging_preference($input: Messaging_preferenceInputInput!) {
    createMessaging_preference(input: $input) {
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
