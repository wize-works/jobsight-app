import { gql } from 'graphql-request';

export const findContents = gql`
query FindContents($filter: ContentFilter!, $sort: ContentSort!, $paging: ContentPaging!) {
    findContents(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            slug
            published
            title
            excerpt
            body
            image
            createdAt
            createdBy
            updatedAt
            updatedBy
      }
    }
  }
`;
