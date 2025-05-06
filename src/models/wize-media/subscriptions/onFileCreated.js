import { gql } from 'graphql-request';

export const onFileCreated = gql`
subscription OnFileCreated {
    onFileCreated {
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
