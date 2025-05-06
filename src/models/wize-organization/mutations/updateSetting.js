import { gql } from 'graphql-request';

export const updateSetting = gql`
mutation UpdateSetting($id: String!, $input: SettingInputInput!) {
    updateSetting(id: $id, input: $input) {
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
