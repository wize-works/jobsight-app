import { gql } from 'graphql-request';

export const createComment = gql`
mutation CreateComment($input: CommentInputInput!) {
    createComment(input: $input) {
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
