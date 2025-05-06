import { gql } from 'graphql-request';

export const createCrew = gql`
mutation CreateCrew($input: CrewInputInput!) {
    createCrew(input: $input) {
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
