/**
 * AI Assistant service for handling AI-generated insights and suggestions
 */

// Mock data for AI suggestions
const mockSuggestions = [
    {
        id: 'sugg-001',
        text: 'Concrete delivery for Riverside Apartments foundation may get delayed due to local supplier shortages. Consider securing alternative sources.',
        type: 'warning',
        priority: 'high',
        projectId: 'proj-001',
        timestamp: '2025-05-01T14:30:00Z',
        context: {
            taskId: 'task-002',
            insightSource: 'supplier data analysis',
            relevantData: {
                supplierName: 'BuildRight Materials Inc.',
                scheduledDelivery: '2025-05-05'
            }
        }
    },
    {
        id: 'sugg-002',
        text: 'Schedule safety inspection for Tower Crane at Downtown Office Tower site. Last inspection was 30 days ago.',
        type: 'task',
        priority: 'medium',
        projectId: 'proj-002',
        timestamp: '2025-05-01T12:15:00Z',
        context: {
            equipmentId: 'EQUIP-003',
            insightSource: 'maintenance schedule analysis',
            relevantData: {
                equipmentName: 'Tower Crane Liebherr 200',
                lastInspection: '2025-04-01'
            }
        }
    },
    {
        id: 'sugg-003',
        text: 'Based on current progress, Metro Transit Station project is 2 days ahead of schedule. Consider reallocating resources to Highland Park project.',
        type: 'info',
        priority: 'low',
        projectId: 'proj-004',
        timestamp: '2025-05-01T11:00:00Z',
        context: {
            insightSource: 'project timeline analysis',
            relevantData: {
                currentProgress: '45%',
                expectedProgress: '43%',
                projectName: 'Metro Transit Station'
            }
        }
    },
    {
        id: 'sugg-004',
        text: 'Revenue for April exceeded forecast by 12%. Consider updating Q2 financial projections.',
        type: 'info',
        priority: 'medium',
        projectId: null,
        timestamp: '2025-05-01T09:45:00Z',
        context: {
            insightSource: 'financial trend analysis',
            relevantData: {
                actualRevenue: 1145000,
                forecastRevenue: 1025000,
                period: 'April 2025'
            }
        }
    },
    {
        id: 'sugg-005',
        text: 'Cement Mixer Truck repair is taking longer than estimated. Consider renting temporary replacement for Riverside Apartments project.',
        type: 'warning',
        priority: 'medium',
        projectId: 'proj-001',
        timestamp: '2025-04-30T16:30:00Z',
        context: {
            equipmentId: 'EQUIP-006',
            insightSource: 'repair timeline analysis',
            relevantData: {
                equipmentName: 'Cement Mixer Truck',
                estimatedCompletionDate: '2025-05-07',
                originalEstimate: '2025-05-03'
            }
        }
    },
    {
        id: 'sugg-006',
        text: 'Weather forecast shows heavy rain next week. Review waterproofing measures for Riverside Apartments foundation work.',
        type: 'task',
        priority: 'high',
        projectId: 'proj-001',
        timestamp: '2025-04-30T14:00:00Z',
        context: {
            insightSource: 'weather data integration',
            relevantData: {
                forecastPeriod: '2025-05-06 to 2025-05-10',
                precipitationProbability: '85%',
                projectName: 'Riverside Apartments'
            }
        }
    },
    {
        id: 'sugg-007',
        text: 'Material costs for Metro Transit Station are currently 3% under budget. Quality metrics remain within acceptable ranges.',
        type: 'success',
        priority: 'low',
        projectId: 'proj-004',
        timestamp: '2025-04-30T11:30:00Z',
        context: {
            insightSource: 'budget variance analysis',
            relevantData: {
                budgetedMaterialCost: 1250000,
                actualMaterialCost: 1212500,
                qualityMetricScore: 94
            }
        }
    },
    {
        id: 'sugg-008',
        text: 'Three team members have scheduling conflicts for the Highland Park investor meeting. Consider rescheduling to May 3rd.',
        type: 'task',
        priority: 'medium',
        projectId: 'proj-003',
        timestamp: '2025-04-30T10:15:00Z',
        context: {
            insightSource: 'calendar analysis',
            relevantData: {
                meetingTitle: 'Highland Park Investors Update',
                scheduledDate: '2025-05-02T10:00:00Z',
                conflictingTeamMembers: ['David Smith', 'Jennifer Wilson', 'Michael Rodriguez']
            }
        }
    }
];

/**
 * Fetch AI-generated suggestions from the API
 * @param {Object} options - Query options
 * @param {string} options.projectId - Filter by project ID
 * @param {string} options.priority - Filter by priority level
 * @param {string} options.type - Filter by suggestion type
 * @returns {Promise<Array>} - Promise resolving to an array of AI suggestions
 */
export const fetchAiSuggestions = async (options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let filteredSuggestions = [...mockSuggestions];

    // Filter by project ID if provided
    if (options.projectId) {
        filteredSuggestions = filteredSuggestions.filter(
            suggestion => suggestion.projectId === options.projectId
        );
    }

    // Filter by priority if provided
    if (options.priority) {
        filteredSuggestions = filteredSuggestions.filter(
            suggestion => suggestion.priority === options.priority
        );
    }

    // Filter by suggestion type if provided
    if (options.type) {
        filteredSuggestions = filteredSuggestions.filter(
            suggestion => suggestion.type === options.type
        );
    }

    // Sort by priority (high to low) and then by timestamp (newest first)
    filteredSuggestions.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const aPriority = priorityOrder[a.priority] || 999;
        const bPriority = priorityOrder[b.priority] || 999;

        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }

        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    // Apply limit if provided
    if (options.limit && options.limit > 0) {
        filteredSuggestions = filteredSuggestions.slice(0, options.limit);
    }

    return filteredSuggestions;
};

/**
 * Generate AI insights for a specific project
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} - Promise resolving to AI insights
 */
export const generateProjectInsights = async (projectId) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real app, this would call an AI service to generate insights
    // For now, we're returning mock insights

    const mockInsights = {
        proj001: "Based on current progress, Riverside Apartments project is on schedule. Material costs are 5% over budget primarily due to concrete price increases. Consider adjusting contingency allocation.",
        proj002: "Downtown Office Tower renovation is making good progress with 60% completion. Team productivity is 15% above average. Electrical inspection completion has reduced regulatory risk.",
        proj003: "Highland Park Residential project permits have been secured ahead of schedule. Land preparation can begin next week, which is 3 days earlier than planned. Weather conditions look favorable.",
        proj004: "Metro Transit Station is ahead of schedule by 2 days. Material costs are 3% under budget without compromising quality metrics. Schedule optimization opportunities exist in the electrical work phase.",
        proj005: "Lakeside Community Center project is currently on hold. Delay risk is increasing by 5% each week. Consider reallocating temporary resources to active projects to optimize utilization."
    };

    return {
        projectId,
        insight: mockInsights[`proj${projectId.split('-')[1]}`] || "No insights available for this project.",
        generatedAt: new Date().toISOString(),
        confidenceScore: 0.87,
        dataPoints: ["schedule", "budget", "resources", "risks", "weather"],
        suggestionsCount: 3
    };
};

/**
 * Mark a suggestion as acted upon
 * @param {string} suggestionId - Suggestion ID
 * @returns {Promise<Object>} - Promise resolving to updated suggestion
 */
export const markSuggestionActedUpon = async (suggestionId) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const suggestionIndex = mockSuggestions.findIndex(s => s.id === suggestionId);

    if (suggestionIndex === -1) {
        throw new Error(`Suggestion with ID ${suggestionId} not found`);
    }

    const updatedSuggestion = {
        ...mockSuggestions[suggestionIndex],
        actedUpon: true,
        actedAt: new Date().toISOString()
    };

    // In a real app, this would update the backend
    // mockSuggestions[suggestionIndex] = updatedSuggestion;

    return updatedSuggestion;
};