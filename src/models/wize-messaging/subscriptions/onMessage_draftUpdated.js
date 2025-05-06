import { gql } from 'graphql-request';

export const onMessage_draftUpdated = gql`
subscription OnMessage_draftUpdated {
    onMessage_draftUpdated {
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
