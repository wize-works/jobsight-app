import { gql } from 'graphql-request';

export const onConversationCreated = gql`
subscription OnConversationCreated {
    onConversationCreated {
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
