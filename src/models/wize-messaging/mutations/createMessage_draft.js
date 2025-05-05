import { gql } from 'graphql-request';

export const createMessage_draft = gql`
mutation CreateMessage_draft($input: Message_draftInputInput!) {
    createMessage_draft(input: $input) {
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
