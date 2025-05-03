// Mock logs data for development
const mockLogs = [
    {
        _id: 'log1',
        projectId: 'project1',
        projectName: 'Downtown High-Rise',
        date: '2025-05-01',
        author: 'John Smith',
        weather: {
            temperature: 72,
            conditions: 'Sunny',
            windSpeed: '5 mph'
        },
        summary: 'Concrete pouring completed for level 3',
        details: 'Successfully completed the concrete pouring for the third floor. All safety protocols were followed. Quality checks passed.',
        hours: {
            regular: 8,
            overtime: 2
        },
        personnel: [
            { name: 'John Smith', role: 'Foreman', hours: 10 },
            { name: 'Mike Johnson', role: 'Concrete Specialist', hours: 10 },
            { name: 'Sarah Williams', role: 'Safety Officer', hours: 8 }
        ],
        equipment: [
            { name: 'Concrete Mixer', hours: 6, notes: 'Regular maintenance performed' },
            { name: 'Crane', hours: 4, notes: '' }
        ],
        materials: [
            { name: 'Concrete Mix', quantity: '20 cubic yards', status: 'Used' },
            { name: 'Rebar', quantity: '500 units', status: 'Used' }
        ],
        tasks: [
            { description: 'Setup formwork', status: 'completed' },
            { description: 'Pour concrete', status: 'completed' },
            { description: 'Initial curing', status: 'in_progress' }
        ],
        approvals: {
            requested: true,
            approved: true,
            approvedBy: 'Robert Johnson',
            approvedDate: '2025-05-01T16:30:00Z'
        }
    },
    {
        _id: 'log2',
        projectId: 'project1',
        projectName: 'Downtown High-Rise',
        date: '2025-04-30',
        author: 'John Smith',
        weather: {
            temperature: 68,
            conditions: 'Cloudy',
            windSpeed: '10 mph'
        },
        summary: 'Formwork preparation for level 3',
        details: 'Completed all formwork and rebar installation for the third floor concrete pour. Equipment and materials are ready for tomorrow.',
        hours: {
            regular: 8,
            overtime: 1
        },
        personnel: [
            { name: 'John Smith', role: 'Foreman', hours: 9 },
            { name: 'Mike Johnson', role: 'Concrete Specialist', hours: 9 },
            { name: 'Dave Brown', role: 'Carpenter', hours: 8 }
        ],
        equipment: [
            { name: 'Power Tools', hours: 7, notes: '' },
            { name: 'Scaffolding', hours: 9, notes: '' }
        ],
        materials: [
            { name: 'Formwork Panels', quantity: '50 panels', status: 'Used' },
            { name: 'Rebar', quantity: '500 units', status: 'Delivered' }
        ],
        tasks: [
            { description: 'Install rebar', status: 'completed' },
            { description: 'Setup formwork', status: 'completed' },
            { description: 'Quality check', status: 'completed' }
        ],
        approvals: {
            requested: true,
            approved: true,
            approvedBy: 'Robert Johnson',
            approvedDate: '2025-04-30T17:15:00Z'
        }
    },
    {
        _id: 'log3',
        projectId: 'project2',
        projectName: 'Westside Bridge Repair',
        date: '2025-05-01',
        author: 'Amanda Lee',
        weather: {
            temperature: 65,
            conditions: 'Light Rain',
            windSpeed: '15 mph'
        },
        summary: 'Inspection and assessment of structural damage',
        details: 'Conducted detailed inspection of bridge supports. Identified three areas requiring immediate attention. Documented with photos and measurements.',
        hours: {
            regular: 6,
            overtime: 0
        },
        personnel: [
            { name: 'Amanda Lee', role: 'Engineer', hours: 6 },
            { name: 'Carlos Rodriguez', role: 'Inspector', hours: 6 },
            { name: 'Tom Wilson', role: 'Safety Manager', hours: 4 }
        ],
        equipment: [
            { name: 'Inspection Tools', hours: 6, notes: '' },
            { name: 'Drones', hours: 2, notes: 'Used for aerial photography' }
        ],
        safetyIncidents: [
            {
                description: 'Minor slip on wet surface',
                severity: 'low',
                actionTaken: 'Area was marked with caution signs and additional non-slip mats were deployed'
            }
        ],
        tasks: [
            { description: 'Visual inspection', status: 'completed' },
            { description: 'Structural assessment', status: 'completed' },
            { description: 'Documentation', status: 'completed' },
            { description: 'Repair planning', status: 'in_progress' }
        ],
        approvals: {
            requested: true,
            approved: false
        },
        photos: [
            { url: '/mock-images/bridge1.jpg', caption: 'Support beam damage - south side' },
            { url: '/mock-images/bridge2.jpg', caption: 'Concrete erosion - pier 3' }
        ]
    },
    {
        _id: 'log4',
        projectId: 'project3',
        projectName: 'Eastside Park Development',
        date: '2025-04-29',
        author: 'Lisa Chen',
        weather: {
            temperature: 75,
            conditions: 'Sunny',
            windSpeed: '3 mph'
        },
        summary: 'Site clearing and initial grading completed',
        details: 'Completed the clearing of vegetation and initial grading for the park area. Topsoil preserved for later use in landscaping. All debris properly disposed.',
        hours: {
            regular: 8,
            overtime: 0
        },
        personnel: [
            { name: 'Lisa Chen', role: 'Project Manager', hours: 8 },
            { name: 'Mark Davis', role: 'Equipment Operator', hours: 8 },
            { name: 'James Wilson', role: 'Laborer', hours: 8 },
            { name: 'Anna Martinez', role: 'Landscaper', hours: 6 }
        ],
        equipment: [
            { name: 'Bulldozer', hours: 7, notes: 'Regular maintenance needed' },
            { name: 'Excavator', hours: 6, notes: '' },
            { name: 'Dump Truck', hours: 8, notes: '' }
        ],
        materials: [
            { name: 'Topsoil', quantity: '40 cubic yards', status: 'Stored' }
        ],
        tasks: [
            { description: 'Remove vegetation', status: 'completed' },
            { description: 'Preserve topsoil', status: 'completed' },
            { description: 'Initial grading', status: 'completed' },
            { description: 'Debris removal', status: 'completed' }
        ],
        approvals: {
            requested: false,
            approved: false
        }
    },
    {
        _id: 'log5',
        projectId: 'project3',
        projectName: 'Eastside Park Development',
        date: '2025-04-30',
        author: 'Lisa Chen',
        weather: {
            temperature: 77,
            conditions: 'Partly Cloudy',
            windSpeed: '7 mph'
        },
        summary: 'Pathway staking and utility marking',
        details: 'Marked out all main pathways according to design plans. Utility companies came onsite to mark underground lines. Adjusted some pathway routes to avoid utility conflicts.',
        hours: {
            regular: 8,
            overtime: 0
        },
        personnel: [
            { name: 'Lisa Chen', role: 'Project Manager', hours: 8 },
            { name: 'David Kim', role: 'Surveyor', hours: 7 },
            { name: 'Anna Martinez', role: 'Landscaper', hours: 8 }
        ],
        equipment: [
            { name: 'Surveying Equipment', hours: 7, notes: '' }
        ],
        qualityIssues: [
            {
                description: 'Found discrepancy between design plans and actual site measurements',
                severity: 'medium',
                resolution: 'Contacted design team for clarification and adjusted layout accordingly'
            }
        ],
        tasks: [
            { description: 'Path layout marking', status: 'completed' },
            { description: 'Utility marking coordination', status: 'completed' },
            { description: 'Route adjustment planning', status: 'completed' },
            { description: 'Updated documentation', status: 'completed' }
        ],
        approvals: {
            requested: true,
            approved: true,
            approvedBy: 'Michael Thompson',
            approvedDate: '2025-05-01T09:45:00Z'
        },
        attachments: [
            { name: 'revised_pathway_layout.pdf', url: '/mock-files/revised_pathway_layout.pdf' },
            { name: 'utility_marking_photos.zip', url: '/mock-files/utility_marking_photos.zip' }
        ]
    }
];

// Generate a unique ID for new logs
const generateId = () => {
    return `log${Date.now()}`;
};

// Helper function to create a deep copy of an object
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Fetch all logs with optional filtering
export const fetchLogs = async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Make a copy of the mock data
    let logs = deepCopy(mockLogs);

    // Apply filters
    if (filters.projectId) {
        logs = logs.filter(log => log.projectId === filters.projectId);
    }

    if (filters.dateFrom) {
        const dateFrom = new Date(filters.dateFrom);
        logs = logs.filter(log => new Date(log.date) >= dateFrom);
    }

    if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        logs = logs.filter(log => new Date(log.date) <= dateTo);
    }

    if (filters.author) {
        const authorLower = filters.author.toLowerCase();
        logs = logs.filter(log => log.author.toLowerCase().includes(authorLower));
    }

    // Sort by date (most recent first)
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));

    return logs;
};

// Fetch a single log by ID
export const fetchLogById = async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const log = mockLogs.find(log => log._id === id);

    if (!log) {
        throw new Error(`Log with ID ${id} not found`);
    }

    return deepCopy(log);
};

// Create a new log
export const createLog = async (logData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newLog = {
        _id: generateId(),
        ...logData,
        // Ensure date is properly formatted
        date: logData.date || new Date().toISOString().split('T')[0],
    };

    // In a real app, this would be a POST request to an API
    // For mock purposes, we'll add it to our local array
    mockLogs.unshift(newLog);

    return deepCopy(newLog);
};

// Update an existing log
export const updateLog = async (id, logData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = mockLogs.findIndex(log => log._id === id);

    if (index === -1) {
        throw new Error(`Log with ID ${id} not found`);
    }

    // Update the log with new data while preserving the ID
    const updatedLog = {
        ...mockLogs[index],
        ...logData,
        _id: id // Ensure ID doesn't change
    };

    mockLogs[index] = updatedLog;

    return deepCopy(updatedLog);
};

// Delete a log
export const deleteLog = async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = mockLogs.findIndex(log => log._id === id);

    if (index === -1) {
        throw new Error(`Log with ID ${id} not found`);
    }

    // Remove the log from the array
    mockLogs.splice(index, 1);

    return { success: true, message: 'Log deleted successfully' };
};