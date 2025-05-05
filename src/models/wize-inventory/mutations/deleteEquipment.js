import { gql } from 'graphql-request';

export const deleteEquipment = gql`
mutation DeleteEquipment($id: ID!) {
    deleteEquipment(id: $id) {
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
