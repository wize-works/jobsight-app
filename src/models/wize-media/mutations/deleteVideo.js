import { gql } from 'graphql-request';

export const deleteVideo = gql`
mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id) {
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
