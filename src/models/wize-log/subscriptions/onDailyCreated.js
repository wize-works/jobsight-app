import { gql } from 'graphql-request';

export const onDailyCreated = gql`
subscription OnDailyCreated {
    onDailyCreated {
          _id
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
