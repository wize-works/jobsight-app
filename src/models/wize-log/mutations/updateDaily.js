import { gql } from 'graphql-request';

export const updateDaily = gql`
mutation UpdateDaily($id: String!, $input: DailyInputInput!) {
    updateDaily(id: $id, input: $input) {
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
