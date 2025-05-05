import { gql } from 'graphql-request';

export const updateContent = gql`
mutation UpdateContent($id: String!, $input: ContentInputInput!) {
    updateContent(id: $id, input: $input) {
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
