import { gql } from 'graphql-request';

export const onProjectCreated = gql`
subscription OnProjectCreated {
    onProjectCreated {
        _id
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
