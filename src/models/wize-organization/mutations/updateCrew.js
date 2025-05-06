import { gql } from 'graphql-request';

export const updateCrew = gql`
mutation UpdateCrew($id: String!, $input: CrewInputInput!) {
    updateCrew(id: $id, input: $input) {
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
