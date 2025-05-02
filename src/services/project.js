// lib/services/ProjectService.ts (server-only)
import { FindProjectsQuery, FindProjectsQueryVariables, FindProjectsDocument } from '@/graphql/wize-project/generated';
import { CreateProjectMutation, CreateProjectMutationVariables, CreateProjectDocument } from '@/graphql/wize-project/generated';
import { DeleteProjectMutation, DeleteProjectDocument } from '@/graphql/wize-project/generated';
import { UpdateProjectMutation, UpdateProjectMutationVariables, UpdateProjectDocument } from '@/graphql/wize-project/generated';
import { print } from 'graphql';

export const ProjectService = {
    async getActiveProjects(limit = 10) {
        //const res = await fetch('https://api.wize.works/wize-project/graphql', {
        const res = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': process.env.WIZE_API_KEY,
            },
            body: JSON.stringify({
                query: print(FindProjectsDocument),
                variables: {
                    filter: { status_eq: 'in_progress' },
                    sort: { createdAt: 'DESC' },
                    paging: { offset: 0, limit },
                },
            }),
        });

        const { data } = (await res.json());
        console.log('Active Projects:', data);
        return data?.findProjects?.data ?? [];
    },

    async getAllProjects(limit = 10, filter = {}) {
        const res = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': process.env.WIZE_API_KEY,
            },
            body: JSON.stringify({
                query: print(FindProjectsDocument),
                variables: {
                    filter,
                    sort: { createdAt: 'DESC' },
                    paging: { offset: 0, limit },
                }
            }),
        });

        const { data } = (await res.json());
        console.log('Filtered Projects:', data);
        return data.findProjects?.data ?? [];
    },

    async createProject(input) {
        const res = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': process.env.WIZE_API_KEY,
            },
            body: JSON.stringify({
                query: print(CreateProjectDocument),
                variables: { input },
            }),
        });

        const { data } = (await res.json());
        return data.createProject;
    },

    async updateProject(id, input) {
        const res = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': process.env.WIZE_API_KEY,
            },
            body: JSON.stringify({
                query: print(UpdateProjectDocument),
                variables: { id, input },
            }),
        });

        const { data } = (await res.json());
        return data.updateProject;
    },

    async deleteProject(id) {
        const res = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': process.env.WIZE_API_KEY,
            },
            body: JSON.stringify({
                query: print(DeleteProjectDocument),
                variables: { id },
            }),
        });

        const { data } = (await res.json());
        return data.deleteProject;
    },
};
