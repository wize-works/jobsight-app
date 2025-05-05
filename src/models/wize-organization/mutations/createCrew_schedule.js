import { gql } from 'graphql-request';

export const createCrew_schedule = gql`
mutation CreateCrew_schedule($input: Crew_scheduleInputInput!) {
    createCrew_schedule(input: $input) {
          _id
        id
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
