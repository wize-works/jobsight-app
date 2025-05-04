import { gql } from 'graphql-request';

export const onFileUpdated = gql`
subscription OnFileUpdated {
    onFileUpdated {
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
