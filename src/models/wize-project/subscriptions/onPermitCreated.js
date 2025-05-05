import { gql } from 'graphql-request';

export const onPermitCreated = gql`
subscription OnPermitCreated {
    onPermitCreated {
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
