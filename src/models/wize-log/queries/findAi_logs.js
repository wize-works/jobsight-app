import { gql } from 'graphql-request';

export const findAi_logs = gql`
query FindAi_logs($filter: Ai_logFilter!, $sort: Ai_logSort!, $paging: Ai_logPaging!) {
    findAi_logs(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            id
            userId
            projectId
            inputText
            responseText
            mode
            createdAt
            createdBy
      }
    }
  }
`;
