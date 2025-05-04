import { gql } from 'graphql-request';

export const findProjects = gql`
query FindProjects($filter: ProjectFilter!, $sort: ProjectSort!, $paging: ProjectPaging!) {
    findProjects(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              id
            name
            description
            status
            startDate
            endDate
            location
            tags
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
