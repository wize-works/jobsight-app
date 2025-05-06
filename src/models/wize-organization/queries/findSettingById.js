import { gql } from 'graphql-request';

export const findSettingById = gql`
query FindSettingById($id: ID!) {
    findSettingById(id: $id) {
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
