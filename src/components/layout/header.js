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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <i className="fa-solid fa-magnifying-glass w-4 h-4 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-full pl-10 h-10 text-sm focus:outline-none"
                        />
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
