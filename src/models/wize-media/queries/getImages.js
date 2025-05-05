import { gql } from 'graphql-request';

export const getImages = gql`
query GetImages($filter: UploadFilterInput!, $sort: UploadSortInput!, $paging: PagingInput!) {
    getImages(filter: $filter, sort: $sort, paging: $paging) {
          data
        meta {
              total
            hasMore
      }
    }
  }
`;
