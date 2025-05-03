import React from 'react';
import Image from 'next/image';

const TeamMemberCard = ({ member, onClick }) => {
    const {
        name,
        role,
        email,
        department,
        status,
        profileImage,
        projects = [],
        tasks = [],
        skills = []
    } = member;

    // Calculate years with company (could be a utility function)
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

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-success text-success-content';
            case 'on leave': return 'bg-warning text-warning-content';
            case 'inactive': return 'bg-error text-error-content';
            default: return 'bg-base-300 text-base-content';
        }
    };

    return (
        <div
            className="card bg-base-100 shadow-md border-l-4 border-primary hover:shadow-lg transition-all duration-300"
            onClick={onClick}
        >
            <div className="card-body p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                        <div className="avatar mr-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt={name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <span className="text-primary text-lg font-semibold">
                                        {name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className="card-title text-lg">{name}</h2>
                            <p className="text-sm text-base-content/70">{role}</p>
                        </div>
                    </div>
                    <span className={`badge ${getStatusColor(status)} text-xs px-2 py-1 rounded-md`}>
                        {status || 'Unknown'}
                    </span>
                </div>

                <div className="text-sm text-base-content/80 mb-1">
                    <i className="fas fa-building mr-1 opacity-70"></i> {department}
                </div>

                <div className="text-sm text-base-content/80 mb-3">
                    <i className="fas fa-envelope mr-1 opacity-70"></i> {email}
                </div>

                <div className="flex justify-between text-xs text-base-content/70 mt-2 pt-2 border-t border-base-200">
                    <div>
                        <i className="fas fa-briefcase mr-1"></i> {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                    </div>
                    <div>
                        <i className="fas fa-tasks mr-1"></i> {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                    </div>
                </div>

                {skills.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-base-200">
                        <div className="flex flex-wrap gap-1">
                            {skills.slice(0, 3).map((skill, index) => (
                                <span key={index} className="badge badge-outline badge-sm">
                                    {skill}
                                </span>
                            ))}
                            {skills.length > 3 && (
                                <span className="badge badge-sm">+{skills.length - 3}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamMemberCard;