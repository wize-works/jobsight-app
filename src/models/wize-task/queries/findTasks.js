import { gql } from 'graphql-request';

export const findTasks = gql`
  query FindTasks($filter: TaskFilter, $sort: TaskSort, $paging: TaskPaging) {
    findTasks(filter: $filter, sort: $sort, paging: $paging) {
      data {
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
  }
`;
