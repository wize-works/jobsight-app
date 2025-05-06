import { gql } from 'graphql-request';

export const findUsers = gql`
query FindUsers($filter: UserFilter!, $sort: UserSort!, $paging: UserPaging!) {
    findUsers(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            organizationId
            role
            displayName
            email
            avatarUrl
            isActive
            createdAt
            updatedAt
      }
    }
  }
`;
