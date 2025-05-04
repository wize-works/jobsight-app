import { gql } from 'graphql-request';

export const onMessage_draftCreated = gql`
subscription OnMessage_draftCreated {
    onMessage_draftCreated {
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
