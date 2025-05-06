import { gql } from 'graphql-request';

export const onInvoiceCreated = gql`
subscription OnInvoiceCreated {
    onInvoiceCreated {
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
