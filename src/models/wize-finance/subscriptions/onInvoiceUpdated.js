import { gql } from 'graphql-request';

export const onInvoiceUpdated = gql`
subscription OnInvoiceUpdated {
    onInvoiceUpdated {
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
