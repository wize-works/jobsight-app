import { gql } from 'graphql-request';

export const findAi_logById = gql`
query FindAi_logById($id: ID!) {
    findAi_logById(id: $id) {
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
