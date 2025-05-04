import { gql } from 'graphql-request';

export const updateComment = gql`
mutation UpdateComment($id: String!, $input: CommentInputInput!) {
    updateComment(id: $id, input: $input) {
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
