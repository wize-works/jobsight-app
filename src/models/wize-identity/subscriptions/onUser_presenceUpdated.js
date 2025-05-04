import { gql } from 'graphql-request';

export const onUser_presenceUpdated = gql`
subscription OnUser_presenceUpdated {
    onUser_presenceUpdated {
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
