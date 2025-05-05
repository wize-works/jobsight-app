import { gql } from 'graphql-request';

export const createPermit = gql`
mutation CreatePermit($input: PermitInputInput!) {
    createPermit(input: $input) {
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
