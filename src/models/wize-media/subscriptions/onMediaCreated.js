import { gql } from 'graphql-request';

export const onMediaCreated = gql`
subscription OnMediaCreated {
    onMediaCreated {
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
