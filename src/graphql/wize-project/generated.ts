import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string; }
    String: { input: string; output: string; }
    Boolean: { input: boolean; output: boolean; }
    Int: { input: number; output: number; }
    Float: { input: number; output: number; }
    Date: { input: any; output: any; }
    DateTime: { input: any; output: any; }
};

export type Mutation = {
    __typename?: 'Mutation';
    createProject?: Maybe<Project>;
    deleteProject?: Maybe<Project>;
    updateProject?: Maybe<Project>;
};


export type MutationCreateProjectArgs = {
    input: ProjectInputInput;
};


export type MutationDeleteProjectArgs = {
    id: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
    id: Scalars['String']['input'];
    input: ProjectInputInput;
};

export type ProjectFilter = {
    _id_eq?: InputMaybe<Scalars['ID']['input']>;
    _id_neq?: InputMaybe<Scalars['ID']['input']>;
    actualEndDate_eq?: InputMaybe<Scalars['Date']['input']>;
    actualEndDate_gt?: InputMaybe<Scalars['Date']['input']>;
    actualEndDate_gte?: InputMaybe<Scalars['Date']['input']>;
    actualEndDate_lt?: InputMaybe<Scalars['Date']['input']>;
    actualEndDate_lte?: InputMaybe<Scalars['Date']['input']>;
    actualEndDate_neq?: InputMaybe<Scalars['Date']['input']>;
    address_contains?: InputMaybe<Scalars['String']['input']>;
    address_endsWith?: InputMaybe<Scalars['String']['input']>;
    address_eq?: InputMaybe<Scalars['String']['input']>;
    address_neq?: InputMaybe<Scalars['String']['input']>;
    address_startsWith?: InputMaybe<Scalars['String']['input']>;
    budget_eq?: InputMaybe<Scalars['Float']['input']>;
    budget_gt?: InputMaybe<Scalars['Float']['input']>;
    budget_gte?: InputMaybe<Scalars['Float']['input']>;
    budget_lt?: InputMaybe<Scalars['Float']['input']>;
    budget_lte?: InputMaybe<Scalars['Float']['input']>;
    budget_neq?: InputMaybe<Scalars['Float']['input']>;
    city_contains?: InputMaybe<Scalars['String']['input']>;
    city_endsWith?: InputMaybe<Scalars['String']['input']>;
    city_eq?: InputMaybe<Scalars['String']['input']>;
    city_neq?: InputMaybe<Scalars['String']['input']>;
    city_startsWith?: InputMaybe<Scalars['String']['input']>;
    client_contains?: InputMaybe<Scalars['String']['input']>;
    client_endsWith?: InputMaybe<Scalars['String']['input']>;
    client_eq?: InputMaybe<Scalars['String']['input']>;
    client_neq?: InputMaybe<Scalars['String']['input']>;
    client_startsWith?: InputMaybe<Scalars['String']['input']>;
    contingency_eq?: InputMaybe<Scalars['Float']['input']>;
    contingency_gt?: InputMaybe<Scalars['Float']['input']>;
    contingency_gte?: InputMaybe<Scalars['Float']['input']>;
    contingency_lt?: InputMaybe<Scalars['Float']['input']>;
    contingency_lte?: InputMaybe<Scalars['Float']['input']>;
    contingency_neq?: InputMaybe<Scalars['Float']['input']>;
    createdAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
    createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
    createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
    createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
    createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
    createdAt_neq?: InputMaybe<Scalars['DateTime']['input']>;
    createdBy_eq?: InputMaybe<Scalars['ID']['input']>;
    createdBy_neq?: InputMaybe<Scalars['ID']['input']>;
    currency_contains?: InputMaybe<Scalars['String']['input']>;
    currency_endsWith?: InputMaybe<Scalars['String']['input']>;
    currency_eq?: InputMaybe<Scalars['String']['input']>;
    currency_neq?: InputMaybe<Scalars['String']['input']>;
    currency_startsWith?: InputMaybe<Scalars['String']['input']>;
    description_contains?: InputMaybe<Scalars['String']['input']>;
    description_endsWith?: InputMaybe<Scalars['String']['input']>;
    description_eq?: InputMaybe<Scalars['String']['input']>;
    description_neq?: InputMaybe<Scalars['String']['input']>;
    description_startsWith?: InputMaybe<Scalars['String']['input']>;
    endDate_eq?: InputMaybe<Scalars['Date']['input']>;
    endDate_gt?: InputMaybe<Scalars['Date']['input']>;
    endDate_gte?: InputMaybe<Scalars['Date']['input']>;
    endDate_lt?: InputMaybe<Scalars['Date']['input']>;
    endDate_lte?: InputMaybe<Scalars['Date']['input']>;
    endDate_neq?: InputMaybe<Scalars['Date']['input']>;
    latitude_eq?: InputMaybe<Scalars['Float']['input']>;
    latitude_gt?: InputMaybe<Scalars['Float']['input']>;
    latitude_gte?: InputMaybe<Scalars['Float']['input']>;
    latitude_lt?: InputMaybe<Scalars['Float']['input']>;
    latitude_lte?: InputMaybe<Scalars['Float']['input']>;
    latitude_neq?: InputMaybe<Scalars['Float']['input']>;
    longitude_eq?: InputMaybe<Scalars['Float']['input']>;
    longitude_gt?: InputMaybe<Scalars['Float']['input']>;
    longitude_gte?: InputMaybe<Scalars['Float']['input']>;
    longitude_lt?: InputMaybe<Scalars['Float']['input']>;
    longitude_lte?: InputMaybe<Scalars['Float']['input']>;
    longitude_neq?: InputMaybe<Scalars['Float']['input']>;
    name_contains?: InputMaybe<Scalars['String']['input']>;
    name_endsWith?: InputMaybe<Scalars['String']['input']>;
    name_eq?: InputMaybe<Scalars['String']['input']>;
    name_neq?: InputMaybe<Scalars['String']['input']>;
    name_startsWith?: InputMaybe<Scalars['String']['input']>;
    organizationId_eq?: InputMaybe<Scalars['ID']['input']>;
    organizationId_neq?: InputMaybe<Scalars['ID']['input']>;
    progress_eq?: InputMaybe<Scalars['Int']['input']>;
    progress_gt?: InputMaybe<Scalars['Int']['input']>;
    progress_gte?: InputMaybe<Scalars['Int']['input']>;
    progress_lt?: InputMaybe<Scalars['Int']['input']>;
    progress_lte?: InputMaybe<Scalars['Int']['input']>;
    progress_neq?: InputMaybe<Scalars['Int']['input']>;
    projectType_contains?: InputMaybe<Scalars['String']['input']>;
    projectType_endsWith?: InputMaybe<Scalars['String']['input']>;
    projectType_eq?: InputMaybe<Scalars['String']['input']>;
    projectType_neq?: InputMaybe<Scalars['String']['input']>;
    projectType_startsWith?: InputMaybe<Scalars['String']['input']>;
    spent_eq?: InputMaybe<Scalars['Float']['input']>;
    spent_gt?: InputMaybe<Scalars['Float']['input']>;
    spent_gte?: InputMaybe<Scalars['Float']['input']>;
    spent_lt?: InputMaybe<Scalars['Float']['input']>;
    spent_lte?: InputMaybe<Scalars['Float']['input']>;
    spent_neq?: InputMaybe<Scalars['Float']['input']>;
    startDate_eq?: InputMaybe<Scalars['Date']['input']>;
    startDate_gt?: InputMaybe<Scalars['Date']['input']>;
    startDate_gte?: InputMaybe<Scalars['Date']['input']>;
    startDate_lt?: InputMaybe<Scalars['Date']['input']>;
    startDate_lte?: InputMaybe<Scalars['Date']['input']>;
    startDate_neq?: InputMaybe<Scalars['Date']['input']>;
    state_contains?: InputMaybe<Scalars['String']['input']>;
    state_endsWith?: InputMaybe<Scalars['String']['input']>;
    state_eq?: InputMaybe<Scalars['String']['input']>;
    state_neq?: InputMaybe<Scalars['String']['input']>;
    state_startsWith?: InputMaybe<Scalars['String']['input']>;
    status_eq?: InputMaybe<Project_Status_Enum_Input_Filter>;
    status_neq?: InputMaybe<Project_Status_Enum_Input_Filter>;
    updatedAt_eq?: InputMaybe<Scalars['DateTime']['input']>;
    updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
    updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
    updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
    updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
    updatedAt_neq?: InputMaybe<Scalars['DateTime']['input']>;
    zipCode_contains?: InputMaybe<Scalars['String']['input']>;
    zipCode_endsWith?: InputMaybe<Scalars['String']['input']>;
    zipCode_eq?: InputMaybe<Scalars['String']['input']>;
    zipCode_neq?: InputMaybe<Scalars['String']['input']>;
    zipCode_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectInputInput = {
    _id?: InputMaybe<Scalars['ID']['input']>;
    actualEndDate?: InputMaybe<Scalars['Date']['input']>;
    address?: InputMaybe<Scalars['String']['input']>;
    budget?: InputMaybe<Scalars['Float']['input']>;
    city?: InputMaybe<Scalars['String']['input']>;
    client?: InputMaybe<Scalars['String']['input']>;
    contingency?: InputMaybe<Scalars['Float']['input']>;
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    createdBy?: InputMaybe<Scalars['ID']['input']>;
    currency?: InputMaybe<Scalars['String']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    endDate?: InputMaybe<Scalars['Date']['input']>;
    latitude?: InputMaybe<Scalars['Float']['input']>;
    longitude?: InputMaybe<Scalars['Float']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    organizationId?: InputMaybe<Scalars['ID']['input']>;
    progress?: InputMaybe<Scalars['Int']['input']>;
    projectType?: InputMaybe<Scalars['String']['input']>;
    spent?: InputMaybe<Scalars['Float']['input']>;
    startDate?: InputMaybe<Scalars['Date']['input']>;
    state?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Project_Status_Enum_Input_Input>;
    updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
    zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectPaging = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectSort = {
    _id?: InputMaybe<Project__Id_SortOrder>;
    actualEndDate?: InputMaybe<Project_ActualEndDate_SortOrder>;
    address?: InputMaybe<Project_Address_SortOrder>;
    budget?: InputMaybe<Project_Budget_SortOrder>;
    city?: InputMaybe<Project_City_SortOrder>;
    client?: InputMaybe<Project_Client_SortOrder>;
    contingency?: InputMaybe<Project_Contingency_SortOrder>;
    createdAt?: InputMaybe<Project_CreatedAt_SortOrder>;
    createdBy?: InputMaybe<Project_CreatedBy_SortOrder>;
    currency?: InputMaybe<Project_Currency_SortOrder>;
    description?: InputMaybe<Project_Description_SortOrder>;
    endDate?: InputMaybe<Project_EndDate_SortOrder>;
    latitude?: InputMaybe<Project_Latitude_SortOrder>;
    longitude?: InputMaybe<Project_Longitude_SortOrder>;
    name?: InputMaybe<Project_Name_SortOrder>;
    organizationId?: InputMaybe<Project_OrganizationId_SortOrder>;
    progress?: InputMaybe<Project_Progress_SortOrder>;
    projectType?: InputMaybe<Project_ProjectType_SortOrder>;
    spent?: InputMaybe<Project_Spent_SortOrder>;
    startDate?: InputMaybe<Project_StartDate_SortOrder>;
    state?: InputMaybe<Project_State_SortOrder>;
    status?: InputMaybe<Project_Status_SortOrder>;
    updatedAt?: InputMaybe<Project_UpdatedAt_SortOrder>;
    zipCode?: InputMaybe<Project_ZipCode_SortOrder>;
};

export type Query = {
    __typename?: 'Query';
    findProjectById?: Maybe<Project>;
    findProjects?: Maybe<ProjectListResult>;
};


export type QueryFindProjectByIdArgs = {
    id: Scalars['ID']['input'];
};


export type QueryFindProjectsArgs = {
    filter?: InputMaybe<ProjectFilter>;
    paging?: InputMaybe<ProjectPaging>;
    sort?: InputMaybe<ProjectSort>;
};

export type Subscription = {
    __typename?: 'Subscription';
    onProjectCreated?: Maybe<Project>;
    onProjectUpdated?: Maybe<Project>;
};

export type Project = {
    __typename?: 'project';
    _id?: Maybe<Scalars['ID']['output']>;
    actualEndDate?: Maybe<Scalars['Date']['output']>;
    address?: Maybe<Scalars['String']['output']>;
    budget?: Maybe<Scalars['Float']['output']>;
    city?: Maybe<Scalars['String']['output']>;
    client?: Maybe<Scalars['String']['output']>;
    contingency?: Maybe<Scalars['Float']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    createdBy?: Maybe<Scalars['ID']['output']>;
    currency?: Maybe<Scalars['String']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    endDate?: Maybe<Scalars['Date']['output']>;
    latitude?: Maybe<Scalars['Float']['output']>;
    longitude?: Maybe<Scalars['Float']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    organizationId?: Maybe<Scalars['ID']['output']>;
    progress?: Maybe<Scalars['Int']['output']>;
    projectType?: Maybe<Scalars['String']['output']>;
    spent?: Maybe<Scalars['Float']['output']>;
    startDate?: Maybe<Scalars['Date']['output']>;
    state?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Project_Status_Enum>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    zipCode?: Maybe<Scalars['String']['output']>;
};

export type ProjectListResult = {
    __typename?: 'projectListResult';
    count?: Maybe<Scalars['Int']['output']>;
    data?: Maybe<Array<Maybe<Project>>>;
};

export enum Project__Id_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_ActualEndDate_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Address_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Budget_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_City_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Client_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Contingency_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_CreatedAt_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_CreatedBy_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Currency_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Description_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_EndDate_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Latitude_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Longitude_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Name_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_OrganizationId_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Progress_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_ProjectType_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Spent_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_StartDate_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_State_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_Status_Enum {
    Cancelled = 'cancelled',
    Completed = 'completed',
    InProgress = 'in_progress',
    OnHold = 'on_hold',
    Planning = 'planning'
}

export enum Project_Status_Enum_Input_Filter {
    Cancelled = 'cancelled',
    Completed = 'completed',
    InProgress = 'in_progress',
    OnHold = 'on_hold',
    Planning = 'planning'
}

export enum Project_Status_Enum_Input_Input {
    Cancelled = 'cancelled',
    Completed = 'completed',
    InProgress = 'in_progress',
    OnHold = 'on_hold',
    Planning = 'planning'
}

export enum Project_Status_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_UpdatedAt_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum Project_ZipCode_SortOrder {
    Asc = 'ASC',
    Desc = 'DESC'
}

export type CreateProjectMutationVariables = Exact<{
    input: ProjectInputInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null };

export type DeleteProjectMutationVariables = Exact<{
    id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null };

export type UpdateProjectMutationVariables = Exact<{
    id: Scalars['String']['input'];
    input: ProjectInputInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null };

export type FindProjectByIdQueryVariables = Exact<{
    id: Scalars['ID']['input'];
}>;


export type FindProjectByIdQuery = { __typename?: 'Query', findProjectById?: { __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null };

export type FindProjectsQueryVariables = Exact<{
    filter: ProjectFilter;
    sort: ProjectSort;
    paging: ProjectPaging;
}>;


export type FindProjectsQuery = { __typename?: 'Query', findProjects?: { __typename?: 'projectListResult', count?: number | null, data?: Array<{ __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null> | null } | null };

export type OnProjectCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnProjectCreatedSubscription = { __typename?: 'Subscription', onProjectCreated?: { __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null };

export type OnProjectUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnProjectUpdatedSubscription = { __typename?: 'Subscription', onProjectUpdated?: { __typename?: 'project', name?: string | null, description?: string | null, client?: string | null, projectType?: string | null, address?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, latitude?: number | null, longitude?: number | null, startDate?: any | null, endDate?: any | null, actualEndDate?: any | null, budget?: number | null, currency?: string | null, contingency?: number | null, spent?: number | null, status?: Project_Status_Enum | null, progress?: number | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: string | null, organizationId?: string | null, _id?: string | null } | null };


export const CreateProjectDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateProject" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProjectInputInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createProject" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteProject" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteProject" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UpdateProjectDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateProject" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProjectInputInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateProject" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const FindProjectByIdDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "FindProjectById" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "findProjectById" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } as unknown as DocumentNode<FindProjectByIdQuery, FindProjectByIdQueryVariables>;
export const FindProjectsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "FindProjects" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProjectFilter" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "sort" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProjectSort" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "paging" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ProjectPaging" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "findProjects" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "sort" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "sort" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "paging" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "paging" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "count" } }, { "kind": "Field", "name": { "kind": "Name", "value": "data" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } }] } as unknown as DocumentNode<FindProjectsQuery, FindProjectsQueryVariables>;
export const OnProjectCreatedDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "subscription", "name": { "kind": "Name", "value": "OnProjectCreated" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "onProjectCreated" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } as unknown as DocumentNode<OnProjectCreatedSubscription, OnProjectCreatedSubscriptionVariables>;
export const OnProjectUpdatedDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "subscription", "name": { "kind": "Name", "value": "OnProjectUpdated" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "onProjectUpdated" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "client" } }, { "kind": "Field", "name": { "kind": "Name", "value": "projectType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zipCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "latitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "longitude" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "actualEndDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "budget" } }, { "kind": "Field", "name": { "kind": "Name", "value": "currency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contingency" } }, { "kind": "Field", "name": { "kind": "Name", "value": "spent" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organizationId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "_id" } }] } }] } }] } as unknown as DocumentNode<OnProjectUpdatedSubscription, OnProjectUpdatedSubscriptionVariables>;