import { gql } from 'graphql-request';

export const updateFile = gql`
mutation UpdateFile($id: String!, $input: FileInputInput!) {
    updateFile(id: $id, input: $input) {
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
