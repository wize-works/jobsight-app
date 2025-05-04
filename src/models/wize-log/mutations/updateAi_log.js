import { gql } from 'graphql-request';

export const updateAi_log = gql`
mutation UpdateAi_log($id: String!, $input: Ai_logInputInput!) {
    updateAi_log(id: $id, input: $input) {
          _id
        id
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
