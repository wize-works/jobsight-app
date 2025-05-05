import { gql } from 'graphql-request';

export const updateMessage_draft = gql`
mutation UpdateMessage_draft($id: String!, $input: Message_draftInputInput!) {
    updateMessage_draft(id: $id, input: $input) {
          _id
        id
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
