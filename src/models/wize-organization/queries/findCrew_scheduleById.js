import { gql } from 'graphql-request';

export const findCrew_scheduleById = gql`
query FindCrew_scheduleById($id: ID!) {
    findCrew_scheduleById(id: $id) {
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
