import { gql } from 'graphql-request';

export const deleteDaily = gql`
mutation DeleteDaily($id: ID!) {
    deleteDaily(id: $id) {
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
