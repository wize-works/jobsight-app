import { gql } from 'graphql-request';

export const findImages = gql`
query FindImages($filter: ImageFilter!, $sort: ImageSort!, $paging: ImagePaging!) {
    findImages(filter: $filter, sort: $sort, paging: $paging) {
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
