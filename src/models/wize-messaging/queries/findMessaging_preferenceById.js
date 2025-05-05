import { gql } from 'graphql-request';

export const findMessaging_preferenceById = gql`
query FindMessaging_preferenceById($id: ID!) {
    findMessaging_preferenceById(id: $id) {
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
