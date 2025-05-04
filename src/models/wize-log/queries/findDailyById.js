import { gql } from 'graphql-request';

export const findDailyById = gql`
query FindDailyById($id: ID!) {
    findDailyById(id: $id) {
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
`;
