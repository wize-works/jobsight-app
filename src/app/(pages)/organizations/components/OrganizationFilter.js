'use client';

const OrganizationFilter = ({
    industry,
    setIndustry,
    status,
    setStatus,
    tier,
    setTier,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    loading
}) => {
    // Hardcoded industry options for demo - would come from API in production
    const industryOptions = ['Construction', 'Electrical', 'Plumbing', 'Landscaping', 'HVAC', 'Other'];

    // Subscription tier options defined in schema
    const tierOptions = ['free', 'basic', 'professional', 'enterprise'];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleIndustryChange = (e) => {
        setIndustry(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleTierChange = (e) => {
        setTier(e.target.value);
    };

    return (
        <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-3 justify-between items-start lg:items-center mb-4">
                {/* Search input */}
                <div className="form-control flex-1 w-full lg:max-w-xs">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search organizations..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            disabled={loading}
                        />
                        <button className="btn btn-square">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>

                {/* View toggle */}
                <div className="join">
                    <button
                        className={`join-item btn btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        disabled={loading}
                    >
                        <i className="fas fa-th-large"></i>
                    </button>
                    <button
                        className={`join-item btn btn-sm ${viewMode === 'table' ? 'btn-active' : ''}`}
                        onClick={() => setViewMode('table')}
                        disabled={loading}
                    >
                        <i className="fas fa-list"></i>
                    </button>
                </div>
            </div>

            {/* Filter options */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Industry filter */}
                <div className="form-control max-w-xs">
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={industry}
                        onChange={handleIndustryChange}
                        disabled={loading}
                    >
                        <option value="all">All Industries</option>
                        {industryOptions.map(opt => (
                            <option key={opt} value={opt.toLowerCase()}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status filter */}
                <div className="form-control max-w-xs">
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={status}
                        onChange={handleStatusChange}
                        disabled={loading}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Subscription tier filter */}
                <div className="form-control max-w-xs">
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={tier}
                        onChange={handleTierChange}
                        disabled={loading}
                    >
                        <option value="all">All Subscription Tiers</option>
                        {tierOptions.map(opt => (
                            <option key={opt} value={opt.toLowerCase()}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default OrganizationFilter;