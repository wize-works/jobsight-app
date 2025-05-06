import { gql } from 'graphql-request';

export const findPermitById = gql`
query FindPermitById($id: ID!) {
    findPermitById(id: $id) {
        _id
        type
        status
        issuedDate
        expirationDate
        uploadedDocs
        inspectorName
        notes
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
