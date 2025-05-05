import { gql } from 'graphql-request';

export const onUser_presenceCreated = gql`
subscription OnUser_presenceCreated {
    onUser_presenceCreated {
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
`;
