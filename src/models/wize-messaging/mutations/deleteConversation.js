import { gql } from 'graphql-request';

export const deleteConversation = gql`
mutation DeleteConversation($id: ID!) {
    deleteConversation(id: $id) {
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
