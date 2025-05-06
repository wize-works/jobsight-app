import { gql } from 'graphql-request';

export const deleteVector_log = gql`
mutation DeleteVector_log($id: ID!) {
    deleteVector_log(id: $id) {
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
