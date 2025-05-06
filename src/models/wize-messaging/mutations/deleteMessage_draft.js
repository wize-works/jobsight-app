import { gql } from 'graphql-request';

export const deleteMessage_draft = gql`
mutation DeleteMessage_draft($id: ID!) {
    deleteMessage_draft(id: $id) {
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
