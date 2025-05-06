import { gql } from 'graphql-request';

export const findInvoices = gql`
query FindInvoices($filter: InvoiceFilter!, $sort: InvoiceSort!, $paging: InvoicePaging!) {
    findInvoices(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
