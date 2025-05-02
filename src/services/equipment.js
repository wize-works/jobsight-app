/**
 * Equipment service for handling equipment-related API calls
 */

// Mock data for equipment
const mockEquipment = [
    {
        id: 'EQUIP-001',
        name: 'Excavator CAT 320',
        type: 'Heavy Machinery',
        status: 'active',
        location: 'Riverside Apartments Site',
        lastMaintenance: '2025-04-10',
        nextMaintenance: '2025-07-10',
        assignedProject: 'proj-001',
        operator: 'Robert Johnson',
        purchaseDate: '2023-05-15',
        purchasePrice: 185000,
        condition: 'Excellent',
        hoursUsed: 1250,
        lastUpdated: '2025-05-01',
        notes: 'Regular maintenance completed ahead of schedule'
    },
    {
        id: 'EQUIP-002',
        name: 'Concrete Pump Truck',
        type: 'Heavy Machinery',
        status: 'in use',
        location: 'Metro Transit Station Site',
        lastMaintenance: '2025-03-20',
        nextMaintenance: '2025-06-20',
        assignedProject: 'proj-004',
        operator: 'James Wilson',
        purchaseDate: '2024-01-10',
        purchasePrice: 210000,
        condition: 'Good',
        hoursUsed: 680,
        lastUpdated: '2025-04-30',
        notes: 'Minor hydraulic leak identified, scheduled for repair'
    },
    {
        id: 'EQUIP-003',
        name: 'Tower Crane Liebherr 200',
        type: 'Heavy Machinery',
        status: 'active',
        location: 'Downtown Office Tower Site',
        lastMaintenance: '2025-04-25',
        nextMaintenance: '2025-07-25',
        assignedProject: 'proj-002',
        operator: 'Michael Rodriguez',
        purchaseDate: '2022-08-12',
        purchasePrice: 620000,
        condition: 'Good',
        hoursUsed: 3100,
        lastUpdated: '2025-04-25',
        notes: 'Safety inspection passed'
    },
    {
        id: 'EQUIP-004',
        name: 'Bulldozer D6',
        type: 'Heavy Machinery',
        status: 'maintenance',
        location: 'Central Maintenance Facility',
        lastMaintenance: '2025-05-01',
        nextMaintenance: '2025-08-01',
        assignedProject: null,
        operator: null,
        purchaseDate: '2021-11-05',
        purchasePrice: 175000,
        condition: 'Fair',
        hoursUsed: 4200,
        lastUpdated: '2025-05-01',
        notes: 'Undergoing scheduled engine overhaul'
    },
    {
        id: 'EQUIP-005',
        name: 'Generator 100KW',
        type: 'Power Equipment',
        status: 'in use',
        location: 'Riverside Apartments Site',
        lastMaintenance: '2025-03-15',
        nextMaintenance: '2025-06-15',
        assignedProject: 'proj-001',
        operator: null,
        purchaseDate: '2024-06-20',
        purchasePrice: 45000,
        condition: 'Excellent',
        hoursUsed: 520,
        lastUpdated: '2025-04-18',
        notes: 'Operating at optimal levels'
    },
    {
        id: 'EQUIP-006',
        name: 'Cement Mixer Truck',
        type: 'Transportation',
        status: 'repair',
        location: 'Service Center',
        lastMaintenance: '2025-02-10',
        nextMaintenance: '2025-05-10',
        assignedProject: null,
        operator: null,
        purchaseDate: '2022-04-30',
        purchasePrice: 120000,
        condition: 'Poor',
        hoursUsed: 6800,
        lastUpdated: '2025-04-30',
        notes: 'Transmission failure, estimated repair completion May 7'
    },
    {
        id: 'EQUIP-007',
        name: 'Scaffold System A',
        type: 'Support Equipment',
        status: 'available',
        location: 'Equipment Warehouse',
        lastMaintenance: '2025-04-05',
        nextMaintenance: '2025-07-05',
        assignedProject: null,
        operator: null,
        purchaseDate: '2023-10-15',
        purchasePrice: 32000,
        condition: 'Good',
        hoursUsed: null,
        lastUpdated: '2025-04-05',
        notes: 'Ready for deployment'
    },
    {
        id: 'EQUIP-008',
        name: 'Aerial Work Platform',
        type: 'Access Equipment',
        status: 'in use',
        location: 'Downtown Office Tower Site',
        lastMaintenance: '2025-04-12',
        nextMaintenance: '2025-07-12',
        assignedProject: 'proj-002',
        operator: 'Lisa Chen',
        purchaseDate: '2024-02-28',
        purchasePrice: 78000,
        condition: 'Excellent',
        hoursUsed: 310,
        lastUpdated: '2025-04-28',
        notes: 'Safety harness system replaced with upgraded model'
    }
];

/**
 * Fetch equipment from the API
 * @param {Object} options - Query options
 * @param {string} options.status - Filter equipment by status
 * @param {string} options.type - Filter equipment by type
 * @param {string} options.location - Filter equipment by location
 * @param {string} options.projectId - Filter equipment by assigned project
 * @returns {Promise<Array>} - Promise resolving to an array of equipment
 */
export const fetchEquipment = async (options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 450));

    // Apply filters (simulating GraphQL query filters)
    let filteredEquipment = [...mockEquipment];

    if (options.status) {
        filteredEquipment = filteredEquipment.filter(equip => equip.status === options.status);
    }

    if (options.type) {
        filteredEquipment = filteredEquipment.filter(equip => equip.type === options.type);
    }

    if (options.location) {
        filteredEquipment = filteredEquipment.filter(equip =>
            equip.location.toLowerCase().includes(options.location.toLowerCase())
        );
    }

    if (options.projectId) {
        filteredEquipment = filteredEquipment.filter(equip => equip.assignedProject === options.projectId);
    }

    // Apply limit if provided
    if (options.limit && options.limit > 0) {
        filteredEquipment = filteredEquipment.slice(0, options.limit);
    }

    return filteredEquipment;
};

/**
 * Fetch a single equipment item by ID
 * @param {string} id - Equipment ID
 * @returns {Promise<Object>} - Promise resolving to an equipment object
 */
export const fetchEquipmentById = async (id) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const equipment = mockEquipment.find(e => e.id === id);

    if (!equipment) {
        throw new Error(`Equipment with ID ${id} not found`);
    }

    return equipment;
};

/**
 * Update equipment status
 * @param {string} id - Equipment ID
 * @param {string} status - New status
 * @param {Object} additionalData - Additional data to update
 * @returns {Promise<Object>} - Promise resolving to the updated equipment
 */
export const updateEquipmentStatus = async (id, status, additionalData = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const equipmentIndex = mockEquipment.findIndex(e => e.id === id);

    if (equipmentIndex === -1) {
        throw new Error(`Equipment with ID ${id} not found`);
    }

    const updatedEquipment = {
        ...mockEquipment[equipmentIndex],
        ...additionalData,
        status,
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    // In a real app, this would update the backend
    // mockEquipment[equipmentIndex] = updatedEquipment;

    return updatedEquipment;
};

/**
 * Assign equipment to a project
 * @param {string} equipmentId - Equipment ID
 * @param {string} projectId - Project ID
 * @param {string} location - New location
 * @param {string} operator - Assigned operator
 * @returns {Promise<Object>} - Promise resolving to the updated equipment
 */
export const assignEquipment = async (equipmentId, projectId, location, operator = null) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const equipmentIndex = mockEquipment.findIndex(e => e.id === equipmentId);

    if (equipmentIndex === -1) {
        throw new Error(`Equipment with ID ${equipmentId} not found`);
    }

    const updatedEquipment = {
        ...mockEquipment[equipmentIndex],
        assignedProject: projectId,
        location,
        operator,
        status: 'in use',
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    // In a real app, this would update the backend
    // mockEquipment[equipmentIndex] = updatedEquipment;

    return updatedEquipment;
};

/**
 * Schedule maintenance for equipment
 * @param {string} equipmentId - Equipment ID
 * @param {string} maintenanceDate - Date of scheduled maintenance
 * @param {string} notes - Maintenance notes
 * @returns {Promise<Object>} - Promise resolving to the updated equipment
 */
export const scheduleMaintenance = async (equipmentId, maintenanceDate, notes) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 550));

    const equipmentIndex = mockEquipment.findIndex(e => e.id === equipmentId);

    if (equipmentIndex === -1) {
        throw new Error(`Equipment with ID ${equipmentId} not found`);
    }

    const updatedEquipment = {
        ...mockEquipment[equipmentIndex],
        nextMaintenance: maintenanceDate,
        notes: notes || mockEquipment[equipmentIndex].notes,
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    // In a real app, this would update the backend
    // mockEquipment[equipmentIndex] = updatedEquipment;

    return updatedEquipment;
};