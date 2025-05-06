import { gql } from 'graphql-request';

export const createEquipment = gql`
mutation CreateEquipment($input: EquipmentInputInput!) {
    createEquipment(input: $input) {
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
