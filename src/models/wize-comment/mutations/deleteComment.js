import { gql } from 'graphql-request';

export const deleteComment = gql`
mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
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
