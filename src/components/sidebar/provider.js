"use client";
import React from "react";
import { createContext, useContext, useState } from "react";


const SidebarContext = createContext({
    isCollapsed: false,
    toggleSidebar: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleSidebar = () => {
        console.log("Sidebar toggled");
        // Use functional update to ensure we always have the latest state
        setIsCollapsed(prevState => !prevState);
    }

    return <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>
}
