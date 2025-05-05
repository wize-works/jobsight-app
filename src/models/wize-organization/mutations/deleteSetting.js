import { gql } from 'graphql-request';

export const deleteSetting = gql`
mutation DeleteSetting($id: ID!) {
    deleteSetting(id: $id) {
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
