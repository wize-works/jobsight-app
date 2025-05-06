import { gql } from 'graphql-request';

export const onCrewCreated = gql`
subscription OnCrewCreated {
    onCrewCreated {
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
