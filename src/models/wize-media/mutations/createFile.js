import { gql } from 'graphql-request';

export const createFile = gql`
mutation CreateFile($input: FileInputInput!) {
    createFile(input: $input) {
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
