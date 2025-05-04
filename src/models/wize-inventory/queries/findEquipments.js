import { gql } from 'graphql-request';

export const findEquipments = gql`
query FindEquipments($filter: EquipmentFilter!, $sort: EquipmentSort!, $paging: EquipmentPaging!) {
    findEquipments(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
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
  }
`;
