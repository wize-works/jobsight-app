import { gql } from 'graphql-request';

export const onCrew_scheduleCreated = gql`
subscription OnCrew_scheduleCreated {
    onCrew_scheduleCreated {
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
