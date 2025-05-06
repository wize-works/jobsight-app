'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import OrganizationHeader from './components/OrganizationHeader';
import OrganizationTabs from './components/OrganizationTabs';

// Will be replaced with actual service integration
const getOrganizationById = async (id) => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Example organization data with the requested ID
    return {
        id,
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
        settings: {
            timezone: 'America/Chicago',
            dateFormat: 'MM/DD/YYYY',
            billingCycle: 'monthly'
        },
        subscriptionTier: 'professional',
        isActive: true,
        userCount: 24,
        projectCount: 8,
        createdAt: '2024-12-10T15:30:00Z',
        updatedAt: '2025-04-15T10:22:33Z'
    };
};

const OrganizationDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [organization, setOrganization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        const loadOrganization = async () => {
            try {
                const data = await getOrganizationById(params.id);
                setOrganization(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading organization:", error);
                toast({
                    title: "Error",
                    description: "Failed to load organization details",
                    variant: "destructive",
                });
                setIsLoading(false);
            }
        };

        if (params.id) {
            loadOrganization();
        }
    }, [params.id, toast]);

    const handleGoBack = () => {
        router.push('/organizations');
    };

    const handleEdit = () => {
        router.push(`/organizations/${params.id}/edit`);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (isLoading) {
        return (
            <div className="flex-1 p-4 sm:p-6 bg-base-200 animate-pulse">
                <div className="h-10 bg-base-300 rounded w-1/3 mb-6"></div>
                <div className="bg-base-100 rounded-lg shadow p-6">
                    <div className="h-8 bg-base-300 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-base-300 rounded w-5/6 mb-6"></div>

                    <div className="flex gap-2 mb-6">
                        <div className="h-8 bg-base-300 rounded w-24"></div>
                        <div className="h-8 bg-base-300 rounded w-24"></div>
                    </div>

                    <div className="h-12 bg-base-300 rounded w-full mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-36 bg-base-300 rounded"></div>
                        <div className="h-36 bg-base-300 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!organization) {
        return (
            <div className="flex-1 p-4 sm:p-6 bg-base-200">
                <div className="text-center py-12 bg-base-100 rounded-lg shadow">
                    <div className="text-4xl text-base-content/30 mb-3">
                        <i className="fas fa-building-circle-xmark"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Organization Not Found</h2>
                    <p className="text-base-content/70 mb-6">
                        The organization you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={handleGoBack}
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Organizations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1 p-4 sm:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Back button */}
                <button
                    className="btn btn-ghost btn-sm mb-6"
                    onClick={handleGoBack}
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Organizations
                </button>

                {/* Organization header with actions */}
                <OrganizationHeader
                    organization={organization}
                    onEdit={handleEdit}
                />

                {/* Content tabs */}
                <OrganizationTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    organization={organization}
                />
            </div>
        </main>
    );
};

export default OrganizationDetailPage;