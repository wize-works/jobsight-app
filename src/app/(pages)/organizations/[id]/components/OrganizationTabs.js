'use client';
import { useState } from 'react';
import OrganizationDetails from './OrganizationDetails';
import OrganizationUsers from './OrganizationUsers';
import OrganizationProjects from './OrganizationProjects';
import OrganizationSettings from './OrganizationSettings';

const OrganizationTabs = ({ activeTab, onTabChange, organization }) => {
    const tabs = [
        { id: 'details', label: 'Details', icon: 'info-circle' },
        { id: 'users', label: 'Users', icon: 'users' },
        { id: 'projects', label: 'Projects', icon: 'project-diagram' },
        { id: 'settings', label: 'Settings', icon: 'cog' }
    ];

    return (
        <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
            <div className="tabs tabs-bordered">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab tab-lg ${activeTab === tab.id ? 'tab-active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <i className={`fas fa-${tab.icon} mr-2`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-6">
                {/* Different Tab Contents */}
                {activeTab === 'details' && <OrganizationDetails organization={organization} />}
                {activeTab === 'users' && <OrganizationUsers organization={organization} />}
                {activeTab === 'projects' && <OrganizationProjects organization={organization} />}
                {activeTab === 'settings' && <OrganizationSettings organization={organization} />}
            </div>
        </div>
    );
};

export default OrganizationTabs;