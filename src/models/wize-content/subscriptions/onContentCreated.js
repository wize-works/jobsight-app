import { gql } from 'graphql-request';

export const onContentCreated = gql`
subscription OnContentCreated {
    onContentCreated {
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
