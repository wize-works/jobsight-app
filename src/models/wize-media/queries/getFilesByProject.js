import { gql } from 'graphql-request';

export const getFilesByProject = gql`
query GetFilesByProject($projectId: ID!) {
    getFilesByProject(projectId: $projectId) 
  }
`;
