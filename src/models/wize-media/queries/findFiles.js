import { gql } from 'graphql-request';

export const findFiles = gql`
query FindFiles($filter: FileFilter!, $sort: FileSort!, $paging: FilePaging!) {
    findFiles(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
              _id
            fileName
            mimeType
            url
            projectId
            uploadedAt
            uploadedBy
      }
    }
  }
`;
