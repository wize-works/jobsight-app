import { gql } from 'graphql-request';

export const updateTask = gql`
mutation UpdateTask($id: ID!, $input: TaskInputInput!) {
    updateTask(id: $id, input: $input) {
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
