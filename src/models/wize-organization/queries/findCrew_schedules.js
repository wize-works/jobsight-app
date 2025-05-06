import { gql } from 'graphql-request';

export const findCrew_schedules = gql`
query FindCrew_schedules($filter: Crew_scheduleFilter!, $sort: Crew_scheduleSort!, $paging: Crew_schedulePaging!) {
    findCrew_schedules(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
