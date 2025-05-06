import { gql } from 'graphql-request';

export const findSettings = gql`
query FindSettings($filter: SettingFilter!, $sort: SettingSort!, $paging: SettingPaging!) {
    findSettings(filter: $filter, sort: $sort, paging: $paging) {
          count
        data {
            _id
            organizationId
            timezone
            defaultProjectTemplateId
            aiAssistantEnabled
            notificationPreferences
            createdAt
            updatedAt
            createdBy
            updatedBy
      }
    }
  }
`;
