import { gql } from 'graphql-request';

export const findVector_logById = gql`
query FindVector_logById($id: ID!) {
    findVector_logById(id: $id) {
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
