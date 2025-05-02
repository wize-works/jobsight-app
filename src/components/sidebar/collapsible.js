"use client";

import React, { useState } from "react";
import { useSidebar } from "./provider";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "@/components/navigation/nav-item";

const NavSection = ({ title, isCollapsed, children }) => {
    return (
        <div className="mt-6">
            <h3 className={`px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${isCollapsed ? "hidden" : ""}`}>{title}</h3>
            <ul className="mt-2 space-y-1 px-2">{children}</ul>
        </div>
    )
}

export const Sidebar = () => {
    const { isCollapsed } = useSidebar();
    const [activeSection] = useState("dashboard");

    return (
        <aside className={`bg-base-100 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? "w-16" : "w-64"}`}>
            <div className="flex items-center h-16 px-2 border-b border-gray-200">
                {/* Full logo - visible when not collapsed */}
                <div className={`flex-1 ${isCollapsed ? "hidden" : "block"}`}>
                    <Link href="/" className="flex items-center">
                        <span className="text-primary text-2xl font-semibold flex items-center">
                            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mr-4"><Image src="/logo.png" alt="Logo" width={32} height={32} className="m-auto" /></div>
                            Job<span className="text-secondary">Sight</span>
                        </span>
                    </Link>
                </div>

                {/* Icon only - visible when collapsed */}
                <div className={`flex-1 ${isCollapsed ? "block" : "hidden"} text-center`}>
                    <Link href="/" className="mx-auto inline-flex">
                        <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-lg mr-4"><Image src="/logo.png" alt="Logo" width={32} height={32} className="m-auto" /></div>
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                {/* Navigation items */}
                <ul className="space-y-1 px-2">
                </ul>

                {/* Navigation sections */}
                <NavSection title="Main" isCollapsed={isCollapsed}>
                    <NavItem key="dashboard" icon="fa-regular fa-rectangles-mixed" text="Dashboard" isActive={activeSection === "dashboard"} isCollapsed={isCollapsed} />
                    <NavItem key="projects" icon="fa-regular fa-building" text="Projects" isCollapsed={isCollapsed} isActive={activeSection === "projects"} />
                    <NavItem key="logs" icon="fa-regular fa-clipboard-list" text="Daily Logs" isCollapsed={isCollapsed} />
                    <NavItem key="invoicing" icon="fa-regular fa-file-invoice-dollar" text="Invoicing" isCollapsed={isCollapsed} isNew={true} />
                    <NavItem key="equipment" icon="fa-regular fa-truck-field" text="Equipment" isCollapsed={isCollapsed} />
                    <NavItem key="team" icon="fa-regular fa-user-group" text="Team" isCollapsed={isCollapsed} />
                    <NavItem key="tasks" icon="fa-regular fa-list-check" text="Tasks" isCollapsed={isCollapsed} />
                </NavSection>

                <NavSection title="TOOLS" isCollapsed={isCollapsed}>
                    <NavItem key="Analytics" icon="fa-regular fa-chart-line" text="Analytics" isCollapsed={isCollapsed} />
                    <NavItem key="ai" icon="fa-regular fa-robot" text="AI Assistant" isCollapsed={isCollapsed} />
                </NavSection>
            </div>

            <div className="border-t border-gray-200 p-4">
                <ul className="space-y-2">
                    <NavItem key="settings" icon="fa-regular fa-gear" text="Settings" isCollapsed={isCollapsed} />
                    <NavItem key="help" icon="fa-regular fa-circle-question" text="Help & Support" isCollapsed={isCollapsed} />
                </ul>

                {/* User profile - full version */}
                <div className={`flex items-center mt-4 p-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? "hidden" : "flex"}`}>
                    <div className="flex-shrink-0">
                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                <Image src="/mystical-forest-spirit.png" alt="User avatar" width={32} height={32} className="rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">Denish N</p>
                        <p className="text-xs text-gray-500">@withden</p>
                    </div>
                </div>

                {/* User profile - collapsed version */}
                <div className={`flex justify-center mt-4 ${isCollapsed ? "block" : "hidden"}`}>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <Image src="/mystical-forest-spirit.png" alt="User avatar" width={32} height={32} className="rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
