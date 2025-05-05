import { gql } from 'graphql-request';

export const createImage = gql`
mutation CreateImage($input: ImageInputInput!) {
    createImage(input: $input) {
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
