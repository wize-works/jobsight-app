import { gql } from 'graphql-request';

export const findMediaById = gql`
query FindMediaById($id: ID!) {
    findMediaById(id: $id) {
          _id
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
