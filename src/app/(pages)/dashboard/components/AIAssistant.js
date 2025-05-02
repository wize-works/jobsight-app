const AIAssistant = ({ suggestions = [], insight = '', loading = false }) => {
    if (loading) {
        return (
            <div className="card h-full col-span-1 lg:col-span-1">
                <div className="card-header p-3 sm:p-4 lg:p-5">
                    <div className="flex items-center">
                        <div className="animate-pulse h-8 w-8 sm:h-10 sm:w-10 bg-primary/20 rounded-full mr-2 sm:mr-3"></div>
                        <div className="animate-pulse h-5 sm:h-6 bg-muted-foreground/20 w-32 sm:w-40 rounded"></div>
                    </div>
                </div>
                <div className="p-3 sm:p-4 lg:p-5">
                    <div className="animate-pulse h-20 sm:h-24 bg-muted-foreground/10 w-full rounded mb-3 sm:mb-4"></div>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse h-6 sm:h-8 bg-muted-foreground/10 w-full rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card h-full col-span-1 lg:col-span-1">
            <div className="card-header p-3 sm:p-4 lg:p-5">
                <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mr-2 sm:mr-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 7V13L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold">AI Assistant</h2>
                </div>
            </div>
            <div className="p-3 sm:p-4 lg:p-5">
                <div className="bg-muted/50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm">{insight || 'No insights available at the moment.'}</p>
                </div>

                <h3 className="font-medium text-sm sm:text-base mb-2 sm:mb-3">Suggestions</h3>
                {suggestions.length === 0 ? (
                    <div className="text-xs sm:text-sm text-muted-foreground">
                        No suggestions available at the moment.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {suggestions.slice(0, 3).map((suggestion, index) => (
                            <div
                                key={index}
                                className="flex items-center p-2 rounded-md bg-background hover:bg-muted/50 transition-colors cursor-pointer"
                            >
                                {getSuggestionIcon(suggestion.type)}
                                <span className="ml-2 text-xs sm:text-sm">{suggestion.text}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function to render different icons based on suggestion type
const getSuggestionIcon = (type) => {
    switch (type?.toLowerCase()) {
        case 'warning':
            return (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            );
        case 'task':
            return (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            );
        case 'info':
            return (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'success':
            return (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        default:
            return (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            );
    }
};

export default AIAssistant;