import { gql } from 'graphql-request';

export const onEquipmentCreated = gql`
subscription OnEquipmentCreated {
    onEquipmentCreated {
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
