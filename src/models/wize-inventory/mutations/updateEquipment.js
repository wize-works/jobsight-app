import { gql } from 'graphql-request';

export const updateEquipment = gql`
mutation UpdateEquipment($id: String!, $input: EquipmentInputInput!) {
    updateEquipment(id: $id, input: $input) {
          _id
        id
        name
        serialNumber
        assignedProjectId
        lastCheckDate
        maintenanceDue
        condition
        qrCodeUrl
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
