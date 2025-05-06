import { gql } from 'graphql-request';

export const onEquipmentUpdated = gql`
subscription OnEquipmentUpdated {
    onEquipmentUpdated {
          _id
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
