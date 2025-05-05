import { gql } from 'graphql-request';

export const deleteMedia = gql`
mutation DeleteMedia($id: ID!) {
    deleteMedia(id: $id) {
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
