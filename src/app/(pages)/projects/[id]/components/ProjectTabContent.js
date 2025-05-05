'use client';

export const ProjectTabContent = ({ type }) => {
    // Get the appropriate content based on the tab type
    const getContent = () => {
        const tabLabels = {
            'tasks': 'Tasks Coming Soon',
            'logs': 'Logs Coming Soon',
            'invoices': 'Invoices Coming Soon'
        };

        const tabDescriptions = {
            'tasks': 'This feature is under development and will be available soon.',
            'logs': 'Daily logs and activity tracking will be available in the next update.',
            'invoices': 'Invoice generation and tracking will be available in the next update.'
        };

        const tabIcons = {
            'tasks': 'fas fa-tasks',
            'logs': 'fas fa-clipboard-list',
            'invoices': 'fas fa-file-invoice-dollar'
        };

        return {
            label: tabLabels[type] || `${type.charAt(0).toUpperCase() + type.slice(1)} Coming Soon`,
            description: tabDescriptions[type] || 'This feature is coming soon.',
            icon: tabIcons[type] || 'fas fa-info-circle'
        };
    };

    const content = getContent();

    return (
        <div className="bg-base-100 rounded-lg shadow-md p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                <i className={`${content.icon} text-2xl text-base-content/50`}></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">{content.label}</h3>
            <p className="text-base-content/60 mb-6">
                {content.description}
            </p>
            <button
                className="btn btn-primary"
                onClick={() => alert(`${content.label} feature is coming soon!`)}
            >
                Learn More
            </button>
        </div>
    );
};

export default ProjectTabContent;