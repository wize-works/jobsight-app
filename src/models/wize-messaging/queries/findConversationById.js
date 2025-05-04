import { gql } from 'graphql-request';

export const findConversationById = gql`
query FindConversationById($id: ID!) {
    findConversationById(id: $id) {
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
