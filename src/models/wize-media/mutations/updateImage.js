import { gql } from 'graphql-request';

export const updateImage = gql`
mutation UpdateImage($id: String!, $input: ImageInputInput!) {
    updateImage(id: $id, input: $input) {
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
