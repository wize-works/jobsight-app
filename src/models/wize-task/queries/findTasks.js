import { gql } from 'graphql-request';

export const findTasks = gql`
query FindTasks($filter: TaskFilter!, $sort: TaskSort!, $paging: TaskPaging!) {
    findTasks(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
