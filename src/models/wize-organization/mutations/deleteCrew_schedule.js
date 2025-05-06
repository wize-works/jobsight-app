import { gql } from 'graphql-request';

export const deleteCrew_schedule = gql`
mutation DeleteCrew_schedule($id: ID!) {
    deleteCrew_schedule(id: $id) {
        _id
        projectId
        crewId
        shiftStart
        shiftEnd
        assignedTasks
        notes
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
