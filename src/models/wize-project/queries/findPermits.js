import { gql } from 'graphql-request';

export const findPermits = gql`
query FindPermits($filter: PermitFilter!, $sort: PermitSort!, $paging: PermitPaging!) {
    findPermits(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
            _id
            projectId
            type
            status
            issuedDate
            expirationDate
            uploadedDocs
            inspectorName
            notes
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
