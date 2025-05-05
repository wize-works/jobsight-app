import { gql } from 'graphql-request';

export const onTaskUpdated = gql`
subscription OnTaskUpdated {
    onTaskUpdated {
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
