import { gql } from 'graphql-request';

export const findVideos = gql`
query FindVideos($filter: VideoFilter!, $sort: VideoSort!, $paging: VideoPaging!) {
    findVideos(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            fileName
            mimeType
            url
            projectId
            uploadedAt
            uploadedBy
      }
    }
  }
`;
