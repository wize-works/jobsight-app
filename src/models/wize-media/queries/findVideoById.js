import { gql } from 'graphql-request';

export const findVideoById = gql`
query FindVideoById($id: ID!) {
    findVideoById(id: $id) {
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
