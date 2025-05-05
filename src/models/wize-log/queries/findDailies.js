import { gql } from 'graphql-request';

export const findDailies = gql`
query FindDailies($filter: DailyFilter!, $sort: DailySort!, $paging: DailyPaging!) {
    findDailies(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
          _id
        projectId
        date
        submittedBy
        summary
        details
        hours
        aiTranscription
        weather
        personnel
        equipment
        materials
        safetyIncidents
        qualityIssues
        createdAt
        updatedAt
        createdBy
        updatedBy
      }
    }
  }
`;
