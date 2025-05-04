import { gql } from 'graphql-request';

export const updateMedia = gql`
mutation UpdateMedia($id: String!, $input: MediaInputInput!) {
    updateMedia(id: $id, input: $input) {
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
