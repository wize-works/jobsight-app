import { gql } from 'graphql-request';

export const onDailyUpdated = gql`
subscription OnDailyUpdated {
    onDailyUpdated {
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
