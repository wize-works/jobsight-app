import { gql } from 'graphql-request';

export const onSettingCreated = gql`
subscription OnSettingCreated {
    onSettingCreated {
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
