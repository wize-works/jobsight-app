import { gql } from 'graphql-request';

export const findDailies = gql`
query FindDailies($filter: DailyFilter!, $sort: DailySort!, $paging: DailyPaging!) {
    findDailies(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            id
            projectId
            date
            submittedBy
            notes
            aiTranscription
            weather
            safetyIncidents
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
