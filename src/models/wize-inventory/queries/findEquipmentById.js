import { gql } from 'graphql-request';

export const findEquipmentById = gql`
query FindEquipmentById($id: ID!) {
    findEquipmentById(id: $id) {
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
