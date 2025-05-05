import { gql } from 'graphql-request';

export const createMedia = gql`
mutation CreateMedia($input: MediaInputInput!) {
    createMedia(input: $input) {
          _id
        id
        projectId
        uploadedBy
        type
        url
        caption
        tags
        logId
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
