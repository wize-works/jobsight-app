import React from 'react';

const TeamFilter = ({
    department,
    setDepartment,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    loading
}) => {
    // Department options for filter dropdown - would normally come from API
    const departmentOptions = [
        { value: 'all', label: 'All Departments' },
        { value: 'management', label: 'Management' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'construction', label: 'Construction' },
        { value: 'leadership', label: 'Leadership' },
        { value: 'administrative', label: 'Administrative' }
    ];

    if (loading) {
        return (
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-base-100 p-4 rounded-lg shadow-md animate-pulse">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="h-10 bg-base-300 rounded w-full sm:w-64"></div>
                    <div className="h-10 bg-base-300 rounded w-full sm:w-48"></div>
                </div>
                <div className="h-10 bg-base-300 rounded w-full sm:w-20"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-base-100 p-4 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Search input */}
                <div className="form-control w-full sm:w-64">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            type="search"
                            placeholder="Search team members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </label>
                </div>

                {/* Department filter */}
                <select
                    className="select select-bordered w-full sm:w-auto"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    {departmentOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* View toggle */}
            <div className="btn-group">
                <button
                    className={`btn ${viewMode === 'grid' ? 'btn-active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                >
                    <i className="fas fa-th-large"></i>
                </button>
                <button
                    className={`btn ${viewMode === 'table' ? 'btn-active' : ''}`}
                    onClick={() => setViewMode('table')}
                    aria-label="Table view"
                >
                    <i className="fas fa-list"></i>
                </button>
            </div>
        </div>
    );
};

export default TeamFilter;