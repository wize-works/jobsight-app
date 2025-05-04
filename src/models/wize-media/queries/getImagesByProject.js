import { gql } from 'graphql-request';

export const getImagesByProject = gql`
query GetImagesByProject($projectId: ID!) {
    getImagesByProject(projectId: $projectId) 
  }
`;
