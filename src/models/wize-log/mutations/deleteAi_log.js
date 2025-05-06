import { gql } from 'graphql-request';

export const deleteAi_log = gql`
mutation DeleteAi_log($id: ID!) {
    deleteAi_log(id: $id) {
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
