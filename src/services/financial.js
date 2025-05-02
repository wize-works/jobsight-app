/**
 * Financial service for handling financial-related API calls
 */

// Mock data for financial records
const mockFinancialRecords = [
    {
        id: 'fin-001',
        type: 'revenue',
        category: 'project payment',
        amount: 450000,
        projectId: 'proj-001',
        description: 'Phase 1 completion payment - Riverside Apartments',
        date: '2025-04-02',
        client: 'Riverfront Developments',
        status: 'completed',
        paymentMethod: 'bank transfer',
        createdBy: 'Michael Chen',
        createdAt: '2025-04-02T15:30:00Z'
    },
    {
        id: 'fin-002',
        type: 'expense',
        category: 'materials',
        amount: 125000,
        projectId: 'proj-001',
        description: 'Concrete and structural steel for foundation work',
        date: '2025-04-05',
        vendor: 'BuildRight Materials Inc.',
        status: 'completed',
        paymentMethod: 'direct debit',
        createdBy: 'Sarah Johnson',
        createdAt: '2025-04-05T10:15:00Z'
    },
    {
        id: 'fin-003',
        type: 'expense',
        category: 'equipment rental',
        amount: 35000,
        projectId: 'proj-002',
        description: 'Monthly crane rental fee',
        date: '2025-04-10',
        vendor: 'Heavy Lift Equipment Co.',
        status: 'completed',
        paymentMethod: 'corporate card',
        createdBy: 'David Smith',
        createdAt: '2025-04-10T14:20:00Z'
    },
    {
        id: 'fin-004',
        type: 'revenue',
        category: 'project payment',
        amount: 320000,
        projectId: 'proj-002',
        description: 'Renovation milestone payment - Office Tower',
        date: '2025-04-15',
        client: 'Metro Business Solutions',
        status: 'completed',
        paymentMethod: 'bank transfer',
        createdBy: 'Michael Chen',
        createdAt: '2025-04-15T16:45:00Z'
    },
    {
        id: 'fin-005',
        type: 'expense',
        category: 'labor',
        amount: 87500,
        projectId: 'proj-004',
        description: 'Weekly labor costs for transit station construction',
        date: '2025-04-18',
        vendor: 'Internal Payroll',
        status: 'completed',
        paymentMethod: 'direct deposit',
        createdBy: 'Jennifer Wilson',
        createdAt: '2025-04-18T17:30:00Z'
    },
    {
        id: 'fin-006',
        type: 'expense',
        category: 'permits',
        amount: 22500,
        projectId: 'proj-003',
        description: 'Building permits for Highland Park development',
        date: '2025-04-20',
        vendor: 'Portland City Planning Office',
        status: 'completed',
        paymentMethod: 'check',
        createdBy: 'David Smith',
        createdAt: '2025-04-20T11:00:00Z'
    },
    {
        id: 'fin-007',
        type: 'revenue',
        category: 'project payment',
        amount: 375000,
        projectId: 'proj-004',
        description: 'Progress payment for transit station',
        date: '2025-04-28',
        client: 'Portland Transit Authority',
        status: 'completed',
        paymentMethod: 'bank transfer',
        createdBy: 'Jennifer Wilson',
        createdAt: '2025-04-28T14:10:00Z'
    },
    {
        id: 'fin-008',
        type: 'expense',
        category: 'maintenance',
        amount: 18500,
        projectId: null,
        description: 'Equipment maintenance and repairs',
        date: '2025-04-30',
        vendor: 'Service Tech Solutions',
        status: 'completed',
        paymentMethod: 'corporate card',
        createdBy: 'Sarah Johnson',
        createdAt: '2025-04-30T09:45:00Z'
    },
    {
        id: 'fin-009',
        type: 'revenue',
        category: 'project payment',
        amount: 250000,
        projectId: 'proj-001',
        description: 'Phase 2 partial payment - Riverside Apartments',
        date: '2025-05-01',
        client: 'Riverfront Developments',
        status: 'pending',
        paymentMethod: 'bank transfer',
        createdBy: 'Michael Chen',
        createdAt: '2025-05-01T13:20:00Z'
    },
    {
        id: 'fin-010',
        type: 'expense',
        category: 'insurance',
        amount: 42000,
        projectId: null,
        description: 'Monthly liability insurance premium',
        date: '2025-05-01',
        vendor: 'Pacific Construction Insurance',
        status: 'scheduled',
        paymentMethod: 'automatic debit',
        createdBy: 'System',
        createdAt: '2025-04-25T00:00:00Z'
    }
];

/**
 * Fetch financial summary
 * @param {Object} options - Query options
 * @param {string} options.period - Time period (month, quarter, year)
 * @param {string} options.projectId - Filter by project ID
 * @returns {Promise<Object>} - Promise resolving to financial summary
 */
export const fetchFinancialSummary = async (options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 550));

    const period = options.period || 'month';
    const projectId = options.projectId;

    // Filter records by date based on the period
    const now = new Date();
    let startDate;

    if (period === 'month') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'quarter') {
        const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
        startDate = new Date(now.getFullYear(), quarterStartMonth, 1);
    } else if (period === 'year') {
        startDate = new Date(now.getFullYear(), 0, 1);
    } else {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // Default to previous month
    }

    // Convert dates to string format for comparison
    const startDateStr = startDate.toISOString().split('T')[0];

    // Filter records
    let relevantRecords = mockFinancialRecords.filter(record =>
        record.date >= startDateStr &&
        (projectId ? record.projectId === projectId : true)
    );

    // Calculate totals
    const revenue = relevantRecords
        .filter(record => record.type === 'revenue' && record.status === 'completed')
        .reduce((sum, record) => sum + record.amount, 0);

    const expenses = relevantRecords
        .filter(record => record.type === 'expense' && record.status === 'completed')
        .reduce((sum, record) => sum + record.amount, 0);

    const pendingRevenue = relevantRecords
        .filter(record => record.type === 'revenue' && record.status === 'pending')
        .reduce((sum, record) => sum + record.amount, 0);

    const scheduledExpenses = relevantRecords
        .filter(record => record.type === 'expense' && record.status === 'scheduled')
        .reduce((sum, record) => sum + record.amount, 0);

    // Calculate profit
    const profit = revenue - expenses;

    // Calculate previous period data for comparison
    // This would typically come from a separate API call in a real application
    // Here we're just providing mock data for demonstration

    // Return the summary
    return {
        period,
        revenue,
        expenses,
        profit,
        pendingRevenue,
        scheduledExpenses,
        revenueByCategory: calculateCategoryBreakdown(relevantRecords, 'revenue'),
        expensesByCategory: calculateCategoryBreakdown(relevantRecords, 'expense')
    };
};

/**
 * Fetch financial transactions
 * @param {Object} options - Query options
 * @param {string} options.startDate - Start date for transactions
 * @param {string} options.endDate - End date for transactions
 * @param {string} options.type - Transaction type (revenue or expense)
 * @param {string} options.status - Transaction status
 * @returns {Promise<Array>} - Promise resolving to transaction array
 */
export const fetchTransactions = async (options = {}) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 450));

    let filteredTransactions = [...mockFinancialRecords];

    // Apply date range filter
    if (options.startDate) {
        filteredTransactions = filteredTransactions.filter(
            record => record.date >= options.startDate
        );
    }

    if (options.endDate) {
        filteredTransactions = filteredTransactions.filter(
            record => record.date <= options.endDate
        );
    }

    // Apply type filter
    if (options.type) {
        filteredTransactions = filteredTransactions.filter(
            record => record.type === options.type
        );
    }

    // Apply status filter
    if (options.status) {
        filteredTransactions = filteredTransactions.filter(
            record => record.status === options.status
        );
    }

    // Apply project filter
    if (options.projectId) {
        filteredTransactions = filteredTransactions.filter(
            record => record.projectId === options.projectId
        );
    }

    // Sort by date (descending)
    filteredTransactions.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    // Apply limit
    if (options.limit) {
        filteredTransactions = filteredTransactions.slice(0, options.limit);
    }

    return filteredTransactions;
};

/**
 * Helper function to calculate category breakdown
 * @param {Array} records - Financial records
 * @param {string} type - Record type (revenue or expense)
 * @returns {Object} - Category breakdown
 */
const calculateCategoryBreakdown = (records, type) => {
    const filteredRecords = records.filter(
        record => record.type === type && record.status === 'completed'
    );

    const breakdown = {};

    filteredRecords.forEach(record => {
        if (!breakdown[record.category]) {
            breakdown[record.category] = 0;
        }
        breakdown[record.category] += record.amount;
    });

    return breakdown;
};