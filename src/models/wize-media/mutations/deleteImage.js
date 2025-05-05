import { gql } from 'graphql-request';

export const deleteImage = gql`
mutation DeleteImage($id: ID!) {
    deleteImage(id: $id) {
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
