import { gql } from 'graphql-request';

export const registerFile = gql`
mutation RegisterFile($input: FileInput!) {
    registerFile(input: $input) {
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
