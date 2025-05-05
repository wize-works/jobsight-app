import { gql } from 'graphql-request';

export const deleteContent = gql`
mutation DeleteContent($id: ID!) {
    deleteContent(id: $id) {
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
