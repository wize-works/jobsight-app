import { gql } from 'graphql-request';

export const deleteTask = gql`
mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      _id
      projectId
      projectName
      title
      status
      priority
      createdAt
      updatedAt
    }
  }
`;
