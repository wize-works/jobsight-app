import { gql } from 'graphql-request';

export const updateVideo = gql`
mutation UpdateVideo($id: String!, $input: VideoInputInput!) {
    updateVideo(id: $id, input: $input) {
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
