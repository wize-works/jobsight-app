import { gql } from 'graphql-request';

export const updateEquipment = gql`
mutation UpdateEquipment($id: String!, $input: EquipmentInputInput!) {
    updateEquipment(id: $id, input: $input) {
        _id
        name
        serialNumber
        assignedProjectId
        assignedProjectName
        lastCheckDate
        maintenanceDue
        type
        status
        location
        condition
        operator
        hoursUsed
        notes
        purchaseDate
        purchasePrice
        lastMaintenanceDate
        nextMaintenanceDate
        qrCodeUrl
        createdAt
        updatedAt
        createdBy
        updatedBy
    }
  }
`;
