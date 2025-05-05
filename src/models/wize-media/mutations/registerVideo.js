import { gql } from 'graphql-request';

export const registerVideo = gql`
mutation RegisterVideo($input: VideoInput!) {
    registerVideo(input: $input) {
          _id
        fileName
        mimeType
        url
        uploadedBy
        projectId
        createdAt
    }
  }
`;
