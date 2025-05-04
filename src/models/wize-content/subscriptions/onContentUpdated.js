import { gql } from 'graphql-request';

export const onContentUpdated = gql`
subscription OnContentUpdated {
    onContentUpdated {
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
