import { gql } from 'graphql-request';

export const updateVector_log = gql`
mutation UpdateVector_log($id: String!, $input: Vector_logInputInput!) {
    updateVector_log(id: $id, input: $input) {
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
