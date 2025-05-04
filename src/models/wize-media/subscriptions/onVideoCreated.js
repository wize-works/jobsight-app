import { gql } from 'graphql-request';

export const onVideoCreated = gql`
subscription OnVideoCreated {
    onVideoCreated {
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
