import { gql } from 'graphql-request';

export const updateTask = gql`
mutation UpdateTask($id: String!, $input: TaskInputInput!) {
    updateTask(id: $id, input: $input) {
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
