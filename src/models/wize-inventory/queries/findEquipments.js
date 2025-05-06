import { gql } from 'graphql-request';

export const findEquipments = gql`
query FindEquipments($filter: EquipmentFilter!, $sort: EquipmentSort!, $paging: EquipmentPaging!) {
    findEquipments(filter: $filter, sort: $sort, paging: $paging) {
        count
        data {
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
  }
`;
