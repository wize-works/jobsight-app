import { gql } from 'graphql-request';

export const findImageById = gql`
query FindImageById($id: ID!) {
    findImageById(id: $id) {
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
