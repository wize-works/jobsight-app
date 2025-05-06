import { gql } from 'graphql-request';

export const findInvoiceById = gql`
query FindInvoiceById($id: ID!) {
    findInvoiceById(id: $id) {
          _id
        projectId
        status
        lineItems
        sentTo
        pdfUrl
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
