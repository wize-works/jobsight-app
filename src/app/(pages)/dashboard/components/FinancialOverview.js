const FinancialOverview = ({ data = {}, loading = false }) => {
    if (loading) {
        return (
            <div className="card h-full col-span-1 lg:col-span-1">
                <div className="card-header p-5">
                    <div className="animate-pulse h-6 bg-muted-foreground/20 w-40 rounded"></div>
                </div>
                <div className="p-5">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="mb-5">
                            <div className="animate-pulse h-5 bg-muted-foreground/20 w-24 rounded mb-2"></div>
                            <div className="flex justify-between items-baseline mb-2">
                                <div className="animate-pulse h-8 bg-muted-foreground/20 w-28 rounded"></div>
                                <div className="animate-pulse h-6 bg-muted-foreground/20 w-16 rounded"></div>
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
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        ) : (
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="card h-full col-span-1 lg:col-span-1">
            <div className="card-header p-5">
                <h2 className="text-xl font-semibold">Financial Overview</h2>
            </div>
            <div className="p-5">
                <div className="mb-5">
                    <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="text-2xl font-bold">{formatCurrency(revenue)}</div>
                        <div className={`flex items-center text-sm ${getChangeColorClass(revenueChange)}`}>
                            {getChangeIcon(revenueChange)}
                            {Math.abs(revenueChange)}%
                        </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="bg-success h-2 rounded-full"
                            style={{ width: `${revenuePercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="text-sm text-muted-foreground mb-1">Expenses</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="text-2xl font-bold">{formatCurrency(expenses)}</div>
                        <div className={`flex items-center text-sm ${getChangeColorClass(-expensesChange)}`}>
                            {getChangeIcon(-expensesChange)}
                            {Math.abs(expensesChange)}%
                        </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="bg-error h-2 rounded-full"
                            style={{ width: `${expensesPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="text-sm text-muted-foreground mb-1">Profit</div>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
                        <div className={`flex items-center text-sm ${getChangeColorClass(profitChange)}`}>
                            {getChangeIcon(profitChange)}
                            {Math.abs(profitChange)}%
                        </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${profitPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverview;