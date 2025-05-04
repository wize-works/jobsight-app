import { gql } from 'graphql-request';

export const deleteTask = gql`
mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
          _id
        id
        projectId
        title
        description
        status
        assignedTo
        dueDate
        isCritical
        orderIndex
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
