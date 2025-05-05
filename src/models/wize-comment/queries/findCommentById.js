import { gql } from 'graphql-request';

export const findCommentById = gql`
query FindCommentById($id: ID!) {
    findCommentById(id: $id) {
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
