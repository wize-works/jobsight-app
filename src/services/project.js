/**
 * Project service for handling project-related API calls
 */

// Mock data for projects
const mockProjects = [
    {
        id: 'proj-001',
        name: 'Riverside Apartments',
        description: 'Construction of a 45-unit luxury apartment complex with riverside views.',
        client: 'Riverfront Developments',
        status: 'active',
        startDate: '2025-03-15',
        dueDate: '2025-11-30',
        completion: 35,
        budget: 4500000,
        manager: 'Michael Chen',
        location: '123 Riverfront Dr, Portland, OR',
        tags: ['residential', 'luxury', 'riverside'],
        lastUpdated: '2025-04-28',
    },
    {
        id: 'proj-002',
        name: 'Downtown Office Tower',
        description: 'Renovation of a 15-story commercial office building in downtown area.',
        client: 'Metro Business Solutions',
        status: 'active',
        startDate: '2025-02-01',
        dueDate: '2025-07-15',
        completion: 60,
        budget: 3200000,
        manager: 'Sarah Johnson',
        location: '456 Main St, Portland, OR',
        tags: ['commercial', 'renovation', 'office'],
        lastUpdated: '2025-05-01',
    },
    {
        id: 'proj-003',
        name: 'Highland Park Residential',
        description: 'Development of 12 single-family homes in Highland Park subdivision.',
        client: 'Highland Development Co.',
        status: 'planning',
        startDate: '2025-06-01',
        dueDate: '2026-03-30',
        completion: 0,
        budget: 5800000,
        manager: 'David Smith',
        location: 'Highland Park, Portland, OR',
        tags: ['residential', 'new build', 'subdivision'],
        lastUpdated: '2025-04-26',
    },
    {
        id: 'proj-004',
        name: 'Metro Transit Station',
        description: 'Construction of a new transit hub with multi-level parking.',
        client: 'Portland Transit Authority',
        status: 'active',
        startDate: '2024-11-15',
        dueDate: '2025-09-30',
        completion: 45,
        budget: 7500000,
        manager: 'Jennifer Wilson',
        location: '789 Transit Way, Portland, OR',
        tags: ['public', 'infrastructure', 'transit'],
        lastUpdated: '2025-05-01',
    },
    {
        id: 'proj-005',
        name: 'Lakeside Community Center',
        description: 'Renovation and expansion of community center with swimming pool and sports facilities.',
        client: 'Lakeside Community Association',
        status: 'on hold',
        startDate: '2025-01-10',
        dueDate: '2025-10-15',
        completion: 15,
        budget: 2800000,
        manager: 'Michael Chen',
        location: '321 Lakefront Ave, Portland, OR',
        tags: ['public', 'community', 'renovation'],
        lastUpdated: '2025-04-15',
    },
    {
        id: 'proj-006',
        name: 'Green Valley Medical Center',
        description: 'Construction of a specialized outpatient medical facility.',
        client: 'Green Valley Healthcare Inc.',
        status: 'completed',
        startDate: '2024-06-01',
        dueDate: '2025-03-30',
        completion: 100,
        budget: 6200000,
        manager: 'Sarah Johnson',
        location: '567 Health Dr, Portland, OR',
        tags: ['healthcare', 'commercial', 'specialized'],
        lastUpdated: '2025-03-30',
    }
];

/**
 * Fetch projects from the API
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of projects to return
 * @param {string} options.status - Filter projects by status
 * @returns {Promise<Array>} - Promise resolving to an array of projects
 */
export const fetchProjects = async (options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate GraphQL filtering
    let filteredProjects = [...mockProjects];

    if (options.status) {
        filteredProjects = filteredProjects.filter(project => project.status === options.status);
    }

    // Apply limit if provided
    if (options.limit && options.limit > 0) {
        filteredProjects = filteredProjects.slice(0, options.limit);
    }

    return filteredProjects;
};

/**
 * Fetch a single project by ID
 * @param {string} id - Project ID
 * @returns {Promise<Object>} - Promise resolving to a project object
 */
export const fetchProjectById = async (id) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const project = mockProjects.find(p => p.id === id);

    if (!project) {
        throw new Error(`Project with ID ${id} not found`);
    }

    return project;
};

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} - Promise resolving to the created project
 */
export const createProject = async (projectData) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 700));

    // Generate a new ID
    const newId = `proj-${String(mockProjects.length + 1).padStart(3, '0')}`;

    const newProject = {
        id: newId,
        ...projectData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
    };

    // In a real app, this would be persisted to the backend
    // mockProjects.push(newProject);

    return newProject;
};

/**
 * Update an existing project
 * @param {string} id - Project ID to update
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} - Promise resolving to the updated project
 */
export const updateProject = async (id, projectData) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const projectIndex = mockProjects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
        throw new Error(`Project with ID ${id} not found`);
    }

    const updatedProject = {
        ...mockProjects[projectIndex],
        ...projectData,
        lastUpdated: new Date().toISOString(),
    };

    // In a real app, this would update the backend
    // mockProjects[projectIndex] = updatedProject;

    return updatedProject;
};

/**
 * Delete a project
 * @param {string} id - Project ID to delete
 * @returns {Promise<boolean>} - Promise resolving to true if deletion was successful
 */
export const deleteProject = async (id) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const projectIndex = mockProjects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
        throw new Error(`Project with ID ${id} not found`);
    }

    // In a real app, this would delete from the backend
    // mockProjects.splice(projectIndex, 1);

    return true;
};
