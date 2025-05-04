import { gql } from 'graphql-request';

export const findPermitById = gql`
query FindPermitById($id: ID!) {
    findPermitById(id: $id) {
          id
        projectId
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
