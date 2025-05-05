import { gql } from 'graphql-request';

export const onImageCreated = gql`
subscription OnImageCreated {
    onImageCreated {
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
