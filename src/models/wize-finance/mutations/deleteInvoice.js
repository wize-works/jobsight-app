import { gql } from 'graphql-request';

export const deleteInvoice = gql`
mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id) {
          _id
        id
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
