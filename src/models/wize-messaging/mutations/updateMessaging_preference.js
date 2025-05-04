import { gql } from 'graphql-request';

export const updateMessaging_preference = gql`
mutation UpdateMessaging_preference($id: String!, $input: Messaging_preferenceInputInput!) {
    updateMessaging_preference(id: $id, input: $input) {
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
