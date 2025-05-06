'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import TeamMemberList from './components/TeamMemberList';
import TeamStatsSummary from './components/TeamStatsSummary';
import TeamFilter from './components/TeamFilter';

// Mock team service (will be replaced with actual API integration)
const getTeamMembers = async () => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        {
            id: 'member-001',
            name: 'Michael Chen',
            role: 'Project Manager',
            email: 'michael.chen@jobsight.co',
            phone: '(555) 123-4567',
            department: 'Management',
            status: 'active',
            profileImage: null,
            projects: ['proj-001', 'proj-004'],
            tasks: ['task-001', 'task-004', 'task-006'],
            joinDate: '2024-11-15T08:00:00Z',
            skills: ['structural', 'project-planning', 'client-relations']
        },
        {
            id: 'member-002',
            name: 'Sarah Johnson',
            role: 'Electrical Engineer',
            email: 'sarah.johnson@jobsight.co',
            phone: '(555) 234-5678',
            department: 'Engineering',
            status: 'active',
            profileImage: null,
            projects: ['proj-002'],
            tasks: ['task-003'],
            joinDate: '2024-12-01T08:00:00Z',
            skills: ['electrical', 'inspection', 'regulatory-compliance']
        },
        {
            id: 'member-003',
            name: 'David Smith',
            role: 'Site Foreman',
            email: 'david.smith@jobsight.co',
            phone: '(555) 345-6789',
            department: 'Construction',
            status: 'active',
            profileImage: null,
            projects: ['proj-001', 'proj-003'],
            tasks: ['task-002', 'task-005'],
            joinDate: '2025-01-10T08:00:00Z',
            skills: ['supervision', 'concrete', 'safety-protocols']
        },
        {
            id: 'member-004',
            name: 'Jennifer Wilson',
            role: 'HVAC Specialist',
            email: 'jennifer.wilson@jobsight.co',
            phone: '(555) 456-7890',
            department: 'Engineering',
            status: 'active',
            profileImage: null,
            projects: ['proj-004'],
            tasks: ['task-004'],
            joinDate: '2025-02-15T08:00:00Z',
            skills: ['hvac', 'design', 'energy-efficiency']
        },
        {
            id: 'member-005',
            name: 'Brandon Korous',
            role: 'Founder/CTO',
            email: 'brandon@jobsight.co',
            phone: '(555) 987-6543',
            department: 'Leadership',
            status: 'active',
            profileImage: null,
            projects: ['proj-001', 'proj-002', 'proj-003', 'proj-004'],
            tasks: [],
            joinDate: '2024-10-01T08:00:00Z',
            skills: ['enterprise-saas', 'cloud', 'field-automation', 'ai']
        }
    ];
};

const TeamPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [teamMembers, setTeamMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [department, setDepartment] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

    useEffect(() => {
        const loadTeamMembers = async () => {
            try {
                const data = await getTeamMembers();
                setTeamMembers(data);
                setFilteredMembers(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error geting team members:", error);
                toast({
                    title: "Error",
                    description: "Failed to load team members",
                    variant: "destructive",
                });
                setIsLoading(false);
            }
        };

        loadTeamMembers();
    }, [toast]);

    // Filter team members based on department and search term
    useEffect(() => {
        let results = teamMembers;

        // Filter by department
        if (department !== 'all') {
            results = results.filter(member => member.department.toLowerCase() === department.toLowerCase());
        }

        // Filter by search term
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            results = results.filter(member =>
                member.name.toLowerCase().includes(lowercasedTerm) ||
                member.role.toLowerCase().includes(lowercasedTerm) ||
                member.email.toLowerCase().includes(lowercasedTerm) ||
                member.department.toLowerCase().includes(lowercasedTerm) ||
                (member.skills && member.skills.some(skill => skill.toLowerCase().includes(lowercasedTerm)))
            );
        }

        setFilteredMembers(results);
    }, [teamMembers, department, searchTerm]);

    const handleAddMember = () => {
        router.push('/team/new');
    };

    const handleGoToMessages = () => {
        router.push('/team/messages');
    };

    const handleMemberClick = (memberId) => {
        router.push(`/team/${memberId}`);
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Header with title and actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Team</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={handleGoToMessages}
                            className="btn btn-outline btn-secondary"
                        >
                            <i className="fas fa-comment-dots mr-2"></i> Messages
                        </button>
                        <button
                            onClick={handleAddMember}
                            className="btn btn-primary"
                        >
                            <i className="fas fa-plus mr-2"></i> Add Team Member
                        </button>
                    </div>
                </div>

                {/* Team stats summary */}
                <TeamStatsSummary teamMembers={teamMembers} loading={isLoading} />

                {/* Filters and view options */}
                <TeamFilter
                    department={department}
                    setDepartment={setDepartment}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    loading={isLoading}
                />

                {/* Team Members List */}
                <TeamMemberList
                    teamMembers={filteredMembers}
                    loading={isLoading}
                    viewMode={viewMode}
                    onMemberClick={handleMemberClick}
                />
            </div>
        </main>
    );
};

export default TeamPage;