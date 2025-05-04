import { gql } from 'graphql-request';

export const generateUploadUrl = gql`
mutation GenerateUploadUrl($type: UploadType!, $fileName: String!) {
    generateUploadUrl(type: $type, fileName: $fileName) {
          uploadUrl
        fileUrl
        fileName
    }
  }
`;
