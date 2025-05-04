import { gql } from 'graphql-request';

export const deleteDaily = gql`
mutation DeleteDaily($id: ID!) {
    deleteDaily(id: $id) {
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
