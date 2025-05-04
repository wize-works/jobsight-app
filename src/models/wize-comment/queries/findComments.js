import { gql } from 'graphql-request';

export const findComments = gql`
query FindComments($filter: CommentFilter!, $sort: CommentSort!, $paging: CommentPaging!) {
    findComments(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            userId
            postId
            name
            createdAt
            createdBy
            comment
      }
    }
  }
`;
