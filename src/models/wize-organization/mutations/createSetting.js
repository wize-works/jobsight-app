import { gql } from 'graphql-request';

export const createSetting = gql`
mutation CreateSetting($input: SettingInputInput!) {
    createSetting(input: $input) {
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
