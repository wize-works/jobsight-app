const FinancialOverview = ({ data = {}, loading = false }) => {
    if (loading) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 bg-base-200 rounded-t-lg">
                    <div className="animate-pulse h-5 sm:h-6 bg-muted-foreground/20 w-32 sm:w-40 rounded"></div>
                </div>
                <div className="p-4 sm:p-5 bg-base-100 rounded-lg shadow-lg flex-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="mb-4 sm:mb-5 last:mb-0">
                            <div className="animate-pulse h-4 sm:h-5 bg-muted-foreground/20 w-20 sm:w-24 rounded mb-2"></div>
                            <div className="flex justify-between items-baseline mb-2">
                                <div className="animate-pulse h-6 sm:h-8 bg-muted-foreground/20 w-24 sm:w-28 rounded"></div>
                                <div className="animate-pulse h-4 sm:h-6 bg-muted-foreground/20 w-12 sm:w-16 rounded"></div>
                            </div>
                            <div className="animate-pulse h-2 bg-muted-foreground/20 w-full rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const { revenue = 0, expenses = 0, profit = 0, revenueChange = 0, expensesChange = 0, profitChange = 0 } = data;

    // Format currency amounts to be more readable
    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(1)}K`;
        }
        return `$${amount.toFixed(2)}`;
    };

    // Get appropriate color classes for change percentages
    const getChangeColorClass = (change) => {
        return change >= 0 ? 'text-success' : 'text-error';
    };

    const getChangeIcon = (change) => {
        return change >= 0 ? (
            <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        ) : (
            <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        );
    };

    // Calculate percentage for progress bars
    const maxValue = Math.max(revenue, expenses, profit);
    const revenuePercentage = maxValue > 0 ? (revenue / maxValue) * 100 : 0;
    const expensesPercentage = maxValue > 0 ? (expenses / maxValue) * 100 : 0;
    const profitPercentage = maxValue > 0 ? (profit / maxValue) * 100 : 0;

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 bg-base-200 rounded-t-lg">
                <h2 className="text-base sm:text-lg font-semibold">Financial Overview</h2>
            </div>
            <div className="p-4 sm:p-5 bg-base-100 rounded-lg shadow-lg flex-1">
                <div className="mb-6">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">Revenue</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="text-xl sm:text-2xl font-bold">{formatCurrency(revenue)}</div>
                        <div className={`flex items-center text-xs sm:text-sm ${getChangeColorClass(revenueChange)}`}>
                            {getChangeIcon(revenueChange)}
                            {Math.abs(revenueChange)}%
                        </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 sm:h-2.5">
                        <div
                            className="bg-success h-2 sm:h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${revenuePercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">Expenses</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="text-xl sm:text-2xl font-bold">{formatCurrency(expenses)}</div>
                        <div className={`flex items-center text-xs sm:text-sm ${getChangeColorClass(-expensesChange)}`}>
                            {getChangeIcon(-expensesChange)}
                            {Math.abs(expensesChange)}%
                        </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 sm:h-2.5">
                        <div
                            className="bg-error h-2 sm:h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${expensesPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">Profit</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="text-xl sm:text-2xl font-bold">{formatCurrency(profit)}</div>
                        <div className={`flex items-center text-xs sm:text-sm ${getChangeColorClass(profitChange)}`}>
                            {getChangeIcon(profitChange)}
                            {Math.abs(profitChange)}%
                        </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 sm:h-2.5">
                        <div
                            className="bg-primary h-2 sm:h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${profitPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverview;