import { gql } from 'graphql-request';

export const findDailyById = gql`
query FindDailyById($id: ID!) {
    findDailyById(id: $id) {
          _id
        projectId
        date
        submittedBy
        summary
        details
        regularHours
        overtimeHours
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
`;
