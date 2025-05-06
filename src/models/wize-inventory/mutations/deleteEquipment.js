import { gql } from 'graphql-request';

export const deleteEquipment = gql`
mutation DeleteEquipment($id: ID!) {
    deleteEquipment(id: $id) {
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
