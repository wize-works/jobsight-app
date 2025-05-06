import { gql } from 'graphql-request';

export const updateConversation = gql`
mutation UpdateConversation($id: String!, $input: ConversationInputInput!) {
    updateConversation(id: $id, input: $input) {
        _id
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
