import { gql } from 'graphql-request';

export const findCrews = gql`
query FindCrews($filter: CrewFilter!, $sort: CrewSort!, $paging: CrewPaging!) {
    findCrews(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            id
            name
            members
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
