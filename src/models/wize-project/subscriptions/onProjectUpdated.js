import { gql } from 'graphql-request';

export const onProjectUpdated = gql`
subscription OnProjectUpdated {
    onProjectUpdated {
          id
        name
        description
        status
        startDate
        endDate
        location
        tags
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
