import { gql } from 'graphql-request';

export const onCrewUpdated = gql`
subscription OnCrewUpdated {
    onCrewUpdated {
        _id
        name
        members
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
