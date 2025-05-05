import { gql } from 'graphql-request';

export const deleteFile = gql`
mutation DeleteFile($id: ID!) {
    deleteFile(id: $id) {
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
