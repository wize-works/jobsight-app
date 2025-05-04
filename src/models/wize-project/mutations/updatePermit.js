import { gql } from 'graphql-request';

export const updatePermit = gql`
mutation UpdatePermit($id: String!, $input: PermitInputInput!) {
    updatePermit(id: $id, input: $input) {
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
