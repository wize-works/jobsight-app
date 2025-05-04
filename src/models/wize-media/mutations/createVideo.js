import { gql } from 'graphql-request';

export const createVideo = gql`
mutation CreateVideo($input: VideoInputInput!) {
    createVideo(input: $input) {
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
