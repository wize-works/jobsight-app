import { gql } from 'graphql-request';

export const onAi_logCreated = gql`
subscription OnAi_logCreated {
    onAi_logCreated {
          _id
        userId
        projectId
        inputText
        responseText
        mode
        createdAt
        createdBy
    }
  }
`;
