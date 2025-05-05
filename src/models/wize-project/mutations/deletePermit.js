import { gql } from 'graphql-request';

export const deletePermit = gql`
mutation DeletePermit($id: ID!) {
    deletePermit(id: $id) {
        _id
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
