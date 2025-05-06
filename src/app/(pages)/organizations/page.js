'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import OrganizationList from './components/OrganizationList';
import OrganizationStatsSummary from './components/OrganizationStatsSummary';
import OrganizationFilter from './components/OrganizationFilter';

// Will be replaced with actual service integration
const getOrganizations = async () => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        {
            id: 'org-001',
            name: 'Acme Construction Ltd.',
            description: 'Commercial construction company specializing in office buildings and retail spaces',
            logoUrl: null,
            industry: 'Construction',
            website: 'https://acmeconstruction.example',
            contactEmail: 'info@acmeconstruction.example',
            contactPhone: '(555) 123-4567',
            address: {
                street: '123 Builder Lane',
                city: 'Chicago',
                state: 'IL',
                postalCode: '60601',
                country: 'USA'
            },
            subscriptionTier: 'professional',
            isActive: true,
            userCount: 24,
            projectCount: 8
        },
        {
            id: 'org-002',
            name: 'SkyHigh Roofing',
            description: 'Residential and commercial roofing contractors',
            logoUrl: null,
            industry: 'Construction',
            website: 'https://skyhigh-roofing.example',
            contactEmail: 'contact@skyhigh-roofing.example',
            contactPhone: '(555) 234-5678',
            address: {
                street: '456 Skyward Ave',
                city: 'Denver',
                state: 'CO',
                postalCode: '80202',
                country: 'USA'
            },
            subscriptionTier: 'basic',
            isActive: true,
            userCount: 12,
            projectCount: 16
        },
        {
            id: 'org-003',
            name: 'GreenField Landscaping',
            description: 'Full-service commercial landscaping and grounds maintenance',
            logoUrl: null,
            industry: 'Landscaping',
            website: 'https://greenfield.example',
            contactEmail: 'hello@greenfield.example',
            contactPhone: '(555) 345-6789',
            address: {
                street: '789 Garden Path',
                city: 'Portland',
                state: 'OR',
                postalCode: '97205',
                country: 'USA'
            },
            subscriptionTier: 'professional',
            isActive: true,
            userCount: 18,
            projectCount: 14
        },
        {
            id: 'org-004',
            name: 'ElectraTech Systems',
            description: 'Commercial electrical contractors and system integrators',
            logoUrl: null,
            industry: 'Electrical',
            website: 'https://electratech.example',
            contactEmail: 'info@electratech.example',
            contactPhone: '(555) 456-7890',
            address: {
                street: '101 Circuit Dr',
                city: 'Austin',
                state: 'TX',
                postalCode: '78701',
                country: 'USA'
            },
            subscriptionTier: 'enterprise',
            isActive: true,
            userCount: 36,
            projectCount: 12
        },
        {
            id: 'org-005',
            name: 'PlumbPerfect Services',
            description: 'Residential and commercial plumbing services',
            logoUrl: null,
            industry: 'Plumbing',
            website: 'https://plumbperfect.example',
            contactEmail: 'service@plumbperfect.example',
            contactPhone: '(555) 567-8901',
            address: {
                street: '202 Waterway Blvd',
                city: 'Miami',
                state: 'FL',
                postalCode: '33129',
                country: 'USA'
            },
            subscriptionTier: 'basic',
            isActive: false,
            userCount: 8,
            projectCount: 5
        }
    ];
};

const OrganizationsPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [organizations, setOrganizations] = useState([]);
    const [filteredOrgs, setFilteredOrgs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [industry, setIndustry] = useState('all');
    const [status, setStatus] = useState('all');
    const [tier, setTier] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

    useEffect(() => {
        const loadOrganizations = async () => {
            try {
                const data = await getOrganizations();
                setOrganizations(data);
                setFilteredOrgs(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error getting organizations:", error);
                toast({
                    title: "Error",
                    description: "Failed to load organizations",
                    variant: "destructive",
                });
                setIsLoading(false);
            }
        };

        loadOrganizations();
    }, [toast]);

    // Filter organizations based on industry, status, tier and search term
    useEffect(() => {
        let results = organizations;

        // Filter by industry
        if (industry !== 'all') {
            results = results.filter(org => org.industry.toLowerCase() === industry.toLowerCase());
        }

        // Filter by status
        if (status !== 'all') {
            const isActive = status === 'active';
            results = results.filter(org => org.isActive === isActive);
        }

        // Filter by subscription tier
        if (tier !== 'all') {
            results = results.filter(org => org.subscriptionTier.toLowerCase() === tier.toLowerCase());
        }

        // Filter by search term
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            results = results.filter(org =>
                org.name.toLowerCase().includes(lowercasedTerm) ||
                (org.description && org.description.toLowerCase().includes(lowercasedTerm)) ||
                org.industry.toLowerCase().includes(lowercasedTerm) ||
                (org.website && org.website.toLowerCase().includes(lowercasedTerm))
            );
        }

        setFilteredOrgs(results);
    }, [organizations, industry, status, tier, searchTerm]);

    const handleAddOrganization = () => {
        router.push('/organizations/new');
    };

    const handleOrganizationClick = (orgId) => {
        router.push(`/organizations/${orgId}`);
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Header with title and actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Organizations</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddOrganization}
                            className="btn btn-primary"
                        >
                            <i className="fas fa-plus mr-2"></i> Add Organization
                        </button>
                    </div>
                </div>

                {/* Organization stats summary */}
                <OrganizationStatsSummary organizations={organizations} loading={isLoading} />

                {/* Filters and view options */}
                <OrganizationFilter
                    industry={industry}
                    setIndustry={setIndustry}
                    status={status}
                    setStatus={setStatus}
                    tier={tier}
                    setTier={setTier}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    loading={isLoading}
                />

                {/* Organizations List */}
                <OrganizationList
                    organizations={filteredOrgs}
                    loading={isLoading}
                    viewMode={viewMode}
                    onOrganizationClick={handleOrganizationClick}
                />
            </div>
        </main>
    );
};

export default OrganizationsPage;