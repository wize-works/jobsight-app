import { gql } from 'graphql-request';

export const registerImage = gql`
mutation RegisterImage($input: ImageInput!) {
    registerImage(input: $input) {
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
