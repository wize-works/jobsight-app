import { gql } from 'graphql-request';

export const findMedias = gql`
query FindMedias($filter: MediaFilter!, $sort: MediaSort!, $paging: MediaPaging!) {
    findMedias(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
