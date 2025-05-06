import React from 'react';
import Image from 'next/image';
import TeamMemberCard from './TeamMemberCard';

const TeamMemberList = ({ teamMembers = [], loading = false, viewMode = 'grid', onMemberClick }) => {
    if (loading) {
        return (
            <div className="mt-6">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="card bg-base-100 shadow-md animate-pulse">
                                <div className="card-body p-5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="rounded-full bg-base-300 h-12 w-12"></div>
                                        <div>
                                            <div className="h-5 bg-base-300 rounded w-24 mb-2"></div>
                                            <div className="h-3 bg-base-300 rounded w-32"></div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-base-300 rounded mb-2 w-full"></div>
                                    <div className="h-4 bg-base-300 rounded mb-3 w-5/6"></div>
                                    <div className="mt-4 flex justify-between">
                                        <div className="h-3 bg-base-300 rounded w-1/4"></div>
                                        <div className="h-3 bg-base-300 rounded w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card bg-base-100 shadow-lg mt-6">
                        <div className="card-body p-0">
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th className="whitespace-nowrap">Name</th>
                                            <th className="whitespace-nowrap">Role</th>
                                            <th className="hidden sm:table-cell whitespace-nowrap">Department</th>
                                            <th className="hidden md:table-cell whitespace-nowrap">Email</th>
                                            <th className="hidden lg:table-cell whitespace-nowrap">Projects</th>
                                            <th className="whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(4)].map((_, i) => (
                                            <tr key={i}>
                                                <td colSpan="6" className="text-center p-4">
                                                    <div className="animate-pulse h-4 bg-muted-foreground/20 w-full rounded"></div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (teamMembers.length === 0) {
        return (
            <div className="text-center py-12 bg-base-100 rounded-lg shadow-md mt-6">
                <div className="mx-auto w-16 h-16 bg-base-200 flex items-center justify-center rounded-full mb-4">
                    <i className="fas fa-users text-2xl text-base-content/50"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">No team members found</h3>
                <p className="text-base-content/60 mb-6">
                    Add your first team member to get started
                </p>
                <button
                    onClick={() => onMemberClick('new')}
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus mr-2"></i> Add Team Member
                </button>
            </div>
        );
    }

    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard
                        key={index}
                        member={member}
                        onClick={() => onMemberClick(member._id)}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="card bg-base-100 shadow-lg mt-6">
            <div className="card-body p-0">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">Name</th>
                                <th className="whitespace-nowrap">Role</th>
                                <th className="hidden sm:table-cell whitespace-nowrap">Department</th>
                                <th className="hidden md:table-cell whitespace-nowrap">Email</th>
                                <th className="hidden lg:table-cell whitespace-nowrap">Projects</th>
                                <th className="whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-4">
                                        <p className="text-muted-foreground">No team members found</p>
                                    </td>
                                </tr>
                            ) : (
                                teamMembers.map((member) => (
                                    <tr key={member._id} className="hover:bg-base-200 hover:shadow-md transition-colors duration-200">
                                        <td className="font-medium">
                                            <div className="flex items-center">
                                                <div className="avatar mr-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        {member.profileImage ? (
                                                            <Image
                                                                src={member.profileImage}
                                                                alt={member.name}
                                                                width={32}
                                                                height={32}
                                                                className="rounded-full"
                                                            />
                                                        ) : (
                                                            <span className="text-primary text-sm font-semibold">
                                                                {member.name.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span>{member.name}</span>
                                            </div>
                                        </td>
                                        <td>{member.role}</td>
                                        <td className="hidden sm:table-cell">{member.department}</td>
                                        <td className="hidden md:table-cell">{member.email}</td>
                                        <td className="hidden lg:table-cell">{member.projects?.length || 0}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onMemberClick(member._id)}
                                                    className="btn btn-sm btn-ghost"
                                                    aria-label="View team member"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-ghost"
                                                    aria-label="Edit team member"
                                                    onClick={() => onMemberClick(`${member._id}/edit`)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamMemberList;