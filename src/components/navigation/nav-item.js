import Link from "next/link";

export const NavItem = ({ icon, text, isActive, isCollapsed, hasChildren, isNew, href = "#" }) => {
    return (
        <li>
            <Link
                href={href}
                className={`flex items-center p-3 ${isActive ? "btn btn-secondary" : "btn bg-base-100 hover:bg-base-300"} rounded-sm shadow-none transition-all duration-200 relative`}
            >
                <i className={`${icon} fa-lg flex-none ${!isCollapsed ? "mr-3" : ""}`} />
                <span className={`flex-1 text-left ${isCollapsed ? "hidden" : ""}`}>{text}</span>
                {isNew && <span className={`badge badge-xs badge-info absolute -top-1 right-0 text-2xs ${isCollapsed ? "hidden" : ""}`}>New</span>}
                {hasChildren && <i className={`far fa-chevron-right w-3 h-3 ${isCollapsed ? "hidden" : ""}`} />}
            </Link>
        </li>
    )
}
