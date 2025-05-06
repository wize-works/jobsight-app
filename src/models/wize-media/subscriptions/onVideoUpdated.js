import { gql } from 'graphql-request';

export const onVideoUpdated = gql`
subscription OnVideoUpdated {
    onVideoUpdated {
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
