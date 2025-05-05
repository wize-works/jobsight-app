import { gql } from 'graphql-request';

export const getFiles = gql`
query GetFiles($filter: UploadFilterInput!, $sort: UploadSortInput!, $paging: PagingInput!) {
    getFiles(filter: $filter, sort: $sort, paging: $paging) {
          data
        meta {
              total
            hasMore
      }
    }
  }
`;
