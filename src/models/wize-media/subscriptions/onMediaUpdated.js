import { gql } from 'graphql-request';

export const onMediaUpdated = gql`
subscription OnMediaUpdated {
    onMediaUpdated {
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
