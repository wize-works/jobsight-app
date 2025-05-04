import { gql } from 'graphql-request';

export const createDaily = gql`
mutation CreateDaily($input: DailyInputInput!) {
    createDaily(input: $input) {
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
