import { gql } from 'graphql-request';

export const onSettingUpdated = gql`
subscription OnSettingUpdated {
    onSettingUpdated {
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
`;
