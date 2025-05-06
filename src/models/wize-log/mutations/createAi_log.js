import { gql } from 'graphql-request';

export const createAi_log = gql`
mutation CreateAi_log($input: Ai_logInputInput!) {
    createAi_log(input: $input) {
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
