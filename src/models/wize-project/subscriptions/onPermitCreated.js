import { gql } from 'graphql-request';

export const onPermitCreated = gql`
subscription OnPermitCreated {
    onPermitCreated {
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
