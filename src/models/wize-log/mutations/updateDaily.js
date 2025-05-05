import { gql } from 'graphql-request';

export const updateDaily = gql`
mutation UpdateDaily($id: String!, $input: DailyInputInput!) {
    updateDaily(id: $id, input: $input) {
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
