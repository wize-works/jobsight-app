import { gql } from 'graphql-request';

export const createTask = gql`
mutation CreateTask($input: TaskInputInput!) {
    createTask(input: $input) {
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
