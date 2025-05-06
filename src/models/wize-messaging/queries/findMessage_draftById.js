import { gql } from 'graphql-request';

export const findMessage_draftById = gql`
query FindMessage_draftById($id: ID!) {
    findMessage_draftById(id: $id) {
        _id
        userId
        conversationId
        text
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
