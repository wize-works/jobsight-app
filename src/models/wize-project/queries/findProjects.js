import { gql } from 'graphql-request';

export const findProjects = gql`
query FindProjects($filter: ProjectFilter!, $sort: ProjectSort!, $paging: ProjectPaging!) {
    findProjects(filter: $filter, sort: $sort, paging: $paging) {
        count
        data {
            _id
            name
            description
            client
            status
            startDate
            endDate
            location
            budget
            currency
            progress
            tags
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
}
`;
