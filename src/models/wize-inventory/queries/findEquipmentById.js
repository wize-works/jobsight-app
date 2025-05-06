import { gql } from 'graphql-request';

export const findEquipmentById = gql`
query FindEquipmentById($id: ID!) {
    findEquipmentById(id: $id) {
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
