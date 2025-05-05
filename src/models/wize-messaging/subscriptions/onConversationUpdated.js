import { gql } from 'graphql-request';

export const onConversationUpdated = gql`
subscription OnConversationUpdated {
    onConversationUpdated {
          _id
        id
        type
        name
        participants
        projectId
        isArchived
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
