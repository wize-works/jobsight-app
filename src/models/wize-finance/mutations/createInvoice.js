import { gql } from 'graphql-request';

export const createInvoice = gql`
mutation CreateInvoice($input: InvoiceInputInput!) {
    createInvoice(input: $input) {
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
