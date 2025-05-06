import { gql } from 'graphql-request';

export const findTaskById = gql`
  query FindTaskById($id: ID!) {
    findTaskById(id: $id) {
      _id
      projectId
      projectName
      title
      description
      status
      priority
      assignedTo
      assignedToName
      dueDate
      tags
      subtasks {
        title
        completed
      }
      attachments {
        filename
        url
        size
      }
      estimatedHours
      actualHours
      comments {
        content
        createdBy
        createdByName
        createdAt
      }
      isCritical
      orderIndex
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;
