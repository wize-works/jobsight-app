import { gql } from 'graphql-request';

export const createConversation = gql`
mutation CreateConversation($input: ConversationInputInput!) {
    createConversation(input: $input) {
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
