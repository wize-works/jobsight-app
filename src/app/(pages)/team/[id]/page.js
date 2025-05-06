'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import TeamMemberProjects from './components/TeamMemberProjects';
import TeamMemberTasks from './components/TeamMemberTasks';
import TeamMemberActivities from './components/TeamMemberActivities';

// Mock API function to get team member details
const getTeamMember = async (id) => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const members = [
        {
            id: 'member-001',
            name: 'Michael Chen',
            role: 'Project Manager',
            email: 'michael.chen@jobsight.co',
            phone: '(555) 123-4567',
            department: 'Management',
            status: 'active',
            profileImage: null,
            bio: 'Experienced project manager with a focus on commercial construction. Specializes in timeline optimization and resource allocation.',
            projects: ['proj-001', 'proj-004'],
            tasks: ['task-001', 'task-004', 'task-006'],
            joinDate: '2024-11-15T08:00:00Z',
            skills: ['structural', 'project-planning', 'client-relations'],
            recentActivities: [
                { id: 'act-001', type: 'task', action: 'Completed', subject: 'Review structural plans', timestamp: '2025-05-01T10:30:00Z' },
                { id: 'act-002', type: 'project', action: 'Updated', subject: 'Metro Transit site status', timestamp: '2025-04-29T14:15:00Z' }
            ]
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
            bio: 'Certified electrical engineer with 8+ years of experience in commercial and industrial projects. Expert in regulatory compliance.',
            projects: ['proj-002'],
            tasks: ['task-003'],
            joinDate: '2024-12-01T08:00:00Z',
            skills: ['electrical', 'inspection', 'regulatory-compliance'],
            recentActivities: [
                { id: 'act-003', type: 'task', action: 'Completed', subject: 'Schedule electrical inspection', timestamp: '2025-05-01T11:30:00Z' }
            ]
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
            bio: 'Hands-on foreman with 15+ years of experience in residential and commercial construction. Specializes in concrete work and site management.',
            projects: ['proj-001', 'proj-003'],
            tasks: ['task-002', 'task-005'],
            joinDate: '2025-01-10T08:00:00Z',
            skills: ['supervision', 'concrete', 'safety-protocols'],
            recentActivities: [
                { id: 'act-004', type: 'task', action: 'Created', subject: 'Order concrete for foundation', timestamp: '2025-04-30T09:00:00Z' },
                { id: 'act-005', type: 'task', action: 'Updated', subject: 'Meet with Highland Park investors', timestamp: '2025-04-28T16:45:00Z' }
            ]
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
            bio: 'Certified HVAC engineer specializing in energy-efficient systems for commercial buildings. Background in sustainable design.',
            projects: ['proj-004'],
            tasks: ['task-004'],
            joinDate: '2025-02-15T08:00:00Z',
            skills: ['hvac', 'design', 'energy-efficiency'],
            recentActivities: [
                { id: 'act-006', type: 'task', action: 'Created', subject: 'Finalize HVAC plans', timestamp: '2025-04-28T13:00:00Z' }
            ]
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
            bio: 'Enterprise SaaS architect with deep experience in Kubernetes, AI, and DevOps. Proven history of leading product and platform teams.',
            projects: ['proj-001', 'proj-002', 'proj-003', 'proj-004'],
            tasks: [],
            joinDate: '2024-10-01T08:00:00Z',
            skills: ['enterprise-saas', 'cloud', 'field-automation', 'ai'],
            recentActivities: [
                { id: 'act-007', type: 'project', action: 'Created', subject: 'Transit Station Project', timestamp: '2025-04-20T11:00:00Z' }
            ]
        }
    ];

    const member = members.find(m => m._id === id);
    if (!member) throw new Error('Team member not found');

    return member;
};

// Mock API function to get project details for a team member
const getTeamMemberProjects = async (projectIds) => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const allProjects = [
        { _id: 'proj-001', name: 'Riverside Apartments', client: 'Riverfront Development', status: 'in_progress', completion: 35, startDate: '2025-01-15T08:00:00Z', endDate: '2025-07-30T17:00:00Z' },
        { _id: 'proj-002', name: 'Office Tower', client: 'Metro Business Group', status: 'in_progress', completion: 65, startDate: '2024-11-01T08:00:00Z', endDate: '2025-06-15T17:00:00Z' },
        { _id: 'proj-003', name: 'Highland Park Residences', client: 'Highland Developers', status: 'planning', completion: 10, startDate: '2025-03-01T08:00:00Z', endDate: '2025-12-15T17:00:00Z' },
        { _id: 'proj-004', name: 'Metro Transit Station', client: 'City Transit Authority', status: 'in_progress', completion: 20, startDate: '2025-02-01T08:00:00Z', endDate: '2025-10-30T17:00:00Z' }
    ];

    return allProjects.filter(project => projectIds.includes(project._id));
};

// Mock API function to get task details for a team member
const getTeamMemberTasks = async (taskIds) => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const allTasks = [
        {
            id: 'task-001',
            title: 'Review structural plans for Riverside Apartments',
            description: 'Analyze and approve the revised structural plans for the main building.',
            projectId: 'proj-001',
            status: 'pending',
            priority: 'high',
            assignedTo: 'Michael Chen',
            dueDate: '2025-05-02T15:00:00Z',
            tags: ['structural', 'review']
        },
        {
            id: 'task-002',
            title: 'Order concrete for foundation pouring',
            description: 'Place order for 150 cubic yards of concrete for the foundation work next week.',
            projectId: 'proj-001',
            status: 'pending',
            priority: 'urgent',
            assignedTo: 'David Smith',
            dueDate: '2025-05-02T12:00:00Z',
            tags: ['material', 'order']
        },
        {
            id: 'task-003',
            title: 'Schedule electrical inspection for Office Tower',
            description: 'Coordinate with city inspector for electrical work approval on floors 5-8.',
            projectId: 'proj-002',
            status: 'completed',
            priority: 'high',
            assignedTo: 'Sarah Johnson',
            dueDate: '2025-05-01T16:00:00Z',
            tags: ['inspection', 'electrical']
        },
        {
            id: 'task-004',
            title: 'Finalize HVAC plans for Transit Station',
            description: 'Complete the review and approval of HVAC system design for all levels.',
            projectId: 'proj-004',
            status: 'pending',
            priority: 'normal',
            assignedTo: 'Jennifer Wilson',
            dueDate: '2025-05-02T17:00:00Z',
            tags: ['hvac', 'design']
        },
        {
            id: 'task-005',
            title: 'Meet with Highland Park investors',
            description: 'Present progress report and updated timeline to key stakeholders.',
            projectId: 'proj-003',
            status: 'pending',
            priority: 'high',
            assignedTo: 'David Smith',
            dueDate: '2025-05-02T10:00:00Z',
            tags: ['meeting', 'reporting']
        },
        {
            id: 'task-006',
            title: 'Prepare weekly progress report',
            description: 'Compile and submit construction progress and milestone achievements for all active projects.',
            projectId: null,
            status: 'pending',
            priority: 'normal',
            assignedTo: 'Michael Chen',
            dueDate: '2025-05-02T16:00:00Z',
            tags: ['reporting', 'administrative']
        }
    ];

    return allTasks.filter(task => taskIds.includes(task._id));
};

const TeamMemberDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [member, setMember] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTeamMemberData = async () => {
            try {
                // get main member data
                const memberData = await getTeamMember(params._id);
                setMember(memberData);

                // get related project and task data
                const [projectsData, tasksData] = await Promise.all([
                    getTeamMemberProjects(memberData.projects || []),
                    getTeamMemberTasks(memberData.tasks || [])
                ]);

                setProjects(projectsData);
                setTasks(tasksData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error geting team member:", error);
                toast({
                    title: "Error",
                    description: "Failed to load team member data",
                    variant: "destructive",
                });
                setIsLoading(false);
            }
        };

        if (params._id) {
            loadTeamMemberData();
        }
    }, [params._id, toast]);

    const handleEditMember = () => {
        router.push(`/team/${params._id}/edit`);
    };

    const handleBackToTeam = () => {
        router.push('/team');
    };

    const handleMessageMember = () => {
        // For now, just navigate to messages page. In the future, this will open a specific conversation
        router.push('/team/messages');

        // Toast to inform users this is a forthcoming feature
        toast({
            title: "Message Started",
            description: "Direct messaging integration is coming soon.",
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="animate-fadeIn animate-pulse">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="h-8 bg-base-300 rounded w-48"></div>
                        <div className="h-10 bg-base-300 rounded w-24"></div>
                    </div>

                    <div className="bg-base-100 rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="h-24 w-24 bg-base-300 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-8 bg-base-300 rounded w-64 mb-3"></div>
                                <div className="h-6 bg-base-300 rounded w-48 mb-2"></div>
                                <div className="h-4 bg-base-300 rounded w-72 mb-4"></div>
                                <div className="h-20 bg-base-300 rounded w-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-base-100 rounded-lg shadow-md p-4">
                            <div className="h-6 bg-base-300 rounded w-32 mb-4"></div>
                            <div className="h-32 bg-base-300 rounded w-full"></div>
                        </div>
                        <div className="bg-base-100 rounded-lg shadow-md p-4">
                            <div className="h-6 bg-base-300 rounded w-32 mb-4"></div>
                            <div className="h-32 bg-base-300 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (!member) {
        return (
            <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
                <div className="text-center py-12 bg-base-100 rounded-lg shadow-md">
                    <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                        <i className="fas fa-user-slash text-2xl text-base-content/50"></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Team member not found</h3>
                    <p className="text-base-content/60 mb-6">
                        The team member you&apos;re looking for doesn&apos;t exist or has been removed
                    </p>
                    <button
                        onClick={handleBackToTeam}
                        className="btn btn-primary"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Team
                    </button>
                </div>
            </main>
        );
    }

    // Calculate time with company
    const formatJoinDate = (dateString) => {
        if (!dateString) return 'Not available';

        const joinDate = new Date(dateString);
        const currentDate = new Date();

        // Calculate years difference
        let years = currentDate.getFullYear() - joinDate.getFullYear();
        let months = currentDate.getMonth() - joinDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years > 0) {
            return `${years} ${years === 1 ? 'year' : 'years'}${months > 0 ? `, ${months} ${months === 1 ? 'month' : 'months'}` : ''}`;
        }

        if (months > 0) {
            return `${months} ${months === 1 ? 'month' : 'months'}`;
        }

        const days = Math.floor((currentDate - joinDate) / (1000 * 60 * 60 * 24));
        return `${days} ${days === 1 ? 'day' : 'days'}`;
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'badge-success';
            case 'on leave': return 'badge-warning';
            case 'inactive': return 'badge-error';
            default: return 'badge-neutral';
        }
    };

    return (
        <main className="flex-1 overflow-x-auto p-2 sm:p-4 lg:p-6 bg-base-200">
            <div className="animate-fadeIn">
                {/* Header with back button and actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToTeam}
                        className="btn btn-ghost btn-sm gap-2"
                    >
                        <i className="fas fa-arrow-left"></i> Back to Team
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleMessageMember}
                            className="btn btn-secondary btn-sm"
                        >
                            <i className="fas fa-comment-dots mr-2"></i> Message
                        </button>
                        <button
                            onClick={handleEditMember}
                            className="btn btn-primary btn-sm"
                        >
                            <i className="fas fa-pencil-alt mr-2"></i> Edit Profile
                        </button>
                    </div>
                </div>

                {/* Team member profile card */}
                <div className="bg-base-100 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="avatar">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                {member.profileImage ? (
                                    <Image
                                        src={member.profileImage}
                                        alt={member.name}
                                        width={96}
                                        height={96}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <span className="text-primary text-3xl font-semibold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                                <h1 className="text-2xl font-bold">{member.name}</h1>
                                <span className={`badge ${getStatusColor(member.status)} mt-1 sm:mt-0`}>
                                    {member.status || 'Unknown'}
                                </span>
                            </div>

                            <div className="text-lg font-medium mb-2">{member.role}</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mb-4">
                                <div className="flex items-center">
                                    <i className="fas fa-building w-5 text-base-content/70 mr-1"></i>
                                    <span>{member.department}</span>
                                </div>

                                <div className="flex items-center">
                                    <i className="fas fa-envelope w-5 text-base-content/70 mr-1"></i>
                                    <span>{member.email}</span>
                                </div>

                                <div className="flex items-center">
                                    <i className="fas fa-phone w-5 text-base-content/70 mr-1"></i>
                                    <span>{member.phone}</span>
                                </div>

                                <div className="flex items-center">
                                    <i className="fas fa-calendar w-5 text-base-content/70 mr-1"></i>
                                    <span>With company for {formatJoinDate(member.joinDate)}</span>
                                </div>
                            </div>

                            {member.bio && (
                                <div className="mt-3">
                                    <h3 className="font-semibold mb-1">Bio</h3>
                                    <p className="text-base-content/80">{member.bio}</p>
                                </div>
                            )}

                            {member.skills && member.skills.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, index) => (
                                            <span key={index} className="badge badge-outline">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Projects and Tasks grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TeamMemberProjects projects={projects} loading={isLoading} />
                    <TeamMemberTasks tasks={tasks} loading={isLoading} />
                </div>

                {/* Recent Activities */}
                <div className="mt-6">
                    <TeamMemberActivities activities={member.recentActivities || []} loading={isLoading} />
                </div>
            </div>
        </main>
    );
};

export default TeamMemberDetailPage;