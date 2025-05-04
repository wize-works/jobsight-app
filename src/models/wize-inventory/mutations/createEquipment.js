import { gql } from 'graphql-request';

export const createEquipment = gql`
mutation CreateEquipment($input: EquipmentInputInput!) {
    createEquipment(input: $input) {
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
