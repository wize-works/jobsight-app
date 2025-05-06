import { gql } from 'graphql-request';

export const createTask = gql`
mutation CreateTask($input: TaskInputInput!) {
    createTask(input: $input) {
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
