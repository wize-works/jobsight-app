import { gql } from 'graphql-request';

export const onVector_logCreated = gql`
subscription OnVector_logCreated {
    onVector_logCreated {
          _id
        id
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
