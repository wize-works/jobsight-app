import { gql } from 'graphql-request';

export const createContent = gql`
mutation CreateContent($input: ContentInputInput!) {
    createContent(input: $input) {
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
