import { gql } from 'graphql-request';

export const getVideosByProject = gql`
query GetVideosByProject($projectId: ID!) {
    getVideosByProject(projectId: $projectId) 
  }
`;
