import { gql } from 'graphql-request';

export const findVector_logs = gql`
query FindVector_logs($filter: Vector_logFilter!, $sort: Vector_logSort!, $paging: Vector_logPaging!) {
    findVector_logs(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            id
            logId
            embedding
            contentType
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
