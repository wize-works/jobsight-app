import { gql } from 'graphql-request';

export const onCommentCreated = gql`
subscription OnCommentCreated {
    onCommentCreated {
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
