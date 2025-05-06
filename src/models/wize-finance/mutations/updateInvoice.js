import { gql } from 'graphql-request';

export const updateInvoice = gql`
mutation UpdateInvoice($id: String!, $input: InvoiceInputInput!) {
    updateInvoice(id: $id, input: $input) {
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
