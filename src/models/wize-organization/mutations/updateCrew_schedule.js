import { gql } from 'graphql-request';

export const updateCrew_schedule = gql`
mutation UpdateCrew_schedule($id: String!, $input: Crew_scheduleInputInput!) {
    updateCrew_schedule(id: $id, input: $input) {
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
