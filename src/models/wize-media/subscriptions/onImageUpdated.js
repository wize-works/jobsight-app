import { gql } from 'graphql-request';

export const onImageUpdated = gql`
subscription OnImageUpdated {
    onImageUpdated {
          _id
        fileName
        mimeType
        url
        projectId
        uploadedAt
        uploadedBy
    }
  }
`;
