import { gql } from 'graphql-request';

export const onPermitUpdated = gql`
subscription OnPermitUpdated {
    onPermitUpdated {
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
