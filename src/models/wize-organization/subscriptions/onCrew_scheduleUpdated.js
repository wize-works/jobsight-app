import { gql } from 'graphql-request';

export const onCrew_scheduleUpdated = gql`
subscription OnCrew_scheduleUpdated {
    onCrew_scheduleUpdated {
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
