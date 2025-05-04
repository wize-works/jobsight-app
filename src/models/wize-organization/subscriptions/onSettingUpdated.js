import { gql } from 'graphql-request';

export const onSettingUpdated = gql`
subscription OnSettingUpdated {
    onSettingUpdated {
          _id
        id
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
