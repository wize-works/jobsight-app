import { gql } from 'graphql-request';

export const findTaskById = gql`
query FindTaskById($id: ID!) {
    findTaskById(id: $id) {
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
