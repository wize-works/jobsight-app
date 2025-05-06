import { gql } from 'graphql-request';

export const createVector_log = gql`
mutation CreateVector_log($input: Vector_logInputInput!) {
    createVector_log(input: $input) {
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
