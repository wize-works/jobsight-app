import { gql } from 'graphql-request';

export const onCommentUpdated = gql`
subscription OnCommentUpdated {
    onCommentUpdated {
          _id
        userId
        postId
        name
        createdAt
        createdBy
        comment
    }
  }
`;
