import { gql } from 'graphql-request';

export const getVideos = gql`
query GetVideos($filter: UploadFilterInput!, $sort: UploadSortInput!, $paging: PagingInput!) {
    getVideos(filter: $filter, sort: $sort, paging: $paging) {
          data
        meta {
              total
            hasMore
      }
    }
  }
`;
