import { gql } from 'graphql-request';

export const onTaskCreated = gql`
subscription OnTaskCreated {
    onTaskCreated {
          _id
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
