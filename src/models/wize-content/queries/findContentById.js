import { gql } from 'graphql-request';

export const findContentById = gql`
query FindContentById($id: ID!) {
    findContentById(id: $id) {
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
`;
