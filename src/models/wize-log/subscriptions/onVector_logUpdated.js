import { gql } from 'graphql-request';

export const onVector_logUpdated = gql`
subscription OnVector_logUpdated {
    onVector_logUpdated {
          _id
        logId
        embedding
        contentType
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
