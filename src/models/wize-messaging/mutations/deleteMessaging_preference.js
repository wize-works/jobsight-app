import { gql } from 'graphql-request';

export const deleteMessaging_preference = gql`
mutation DeleteMessaging_preference($id: ID!) {
    deleteMessaging_preference(id: $id) {
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
