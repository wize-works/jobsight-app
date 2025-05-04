import { gql } from 'graphql-request';

export const findFileById = gql`
query FindFileById($id: ID!) {
    findFileById(id: $id) {
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
