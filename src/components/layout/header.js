"use client"

import { useSidebar } from "@/components/sidebar/provider";
import { ThemeToggle } from "@/components/theme/toggle";
import { useCallback } from "react";
import Image from "next/image";

export default function Header() {
    const { isCollapsed, toggleSidebar } = useSidebar()

    // Use memoized callback to prevent unnecessary re-renders
    const handleToggle = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
    }, [toggleSidebar]);

    return (
        <header className="bg-base-100 border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center flex-1">
                    {/* Sidebar toggle button */}
                    <button
                        onClick={handleToggle}
                        className="p-2 mr-4 rounded-md hover:bg-gray-100"
                        type="button"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <i className={`${isCollapsed ? "fa-solid fa-chevron-right" : "fa-solid fa-chevron-left"}`} />
                    </button>

                    <div className="relative w-64">
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
                            <input type="search" required placeholder="Search" />
                        </label>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <button className="btn btn-ghost btn-circle">
                        <i className="fa-solid fa-desktop w-5 h-5" />
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <i className="fa-solid fa-bell w-5 h-5" />
                            <span className="indicator-item badge badge-xs badge-primary"></span>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    )
}
