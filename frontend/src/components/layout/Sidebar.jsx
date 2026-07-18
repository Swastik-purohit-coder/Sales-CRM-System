import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
    LayoutDashboard,
    Users,
    BriefcaseBusiness,
    MessageSquare,
    Bell,
    BarChart3,
    PieChart,
    Activity,
    Settings,
    UserCircle,
    LogOut,
    X,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
    const { user, logout } = useAuth();

    const adminLinks = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            name: "Users",
            path: "/admin/users",
        },
        {
            name: "Leads",
            path: "/admin/leads",
        },
        {
            name: "Chat",
            path: "/chat",
        },
        {
            name: "Notifications",
            path: "/notifications",
        },
        {
            name: "Reports",
            path: "/reports",
        },
        {
            name: "Profile",
            path: "/profile",
        },
        {
            name: "Analytics",
            path: "/admin/analytics",
        },
        {
            name: "Activity Logs",
            path: "/admin/activity",
        },
        {
            name: "Settings",
            path: "/admin/settings",
        },
    ];

    const salesLinks = [
        {
            name: "Dashboard",
            path: "/sales/dashboard",
        },
        {
            name: "My Leads",
            path: "/sales/leads",
        },
        {
            name: "Chat",
            path: "/sales/chat",
        },
        {
            name: "Notifications",
            path: "/sales/notifications",
        },
        {
            name: "Profile",
            path: "/sales/profile",
        },
    ];

    const links =
        user?.role?.toLowerCase() === "admin"
            ? adminLinks
            : salesLinks;

    const getIcon = (name) => {
        switch (name) {
            case "Dashboard":
                return <LayoutDashboard />;
            case "Users":
                return <Users />;
            case "Leads":
            case "My Leads":
                return <BriefcaseBusiness />;
            case "Chat":
                return <MessageSquare />;
            case "Notifications":
                return <Bell />;
            case "Reports":
                return <BarChart3 />;
            case "Analytics":
                return <PieChart />;
            case "Activity Logs":
                return <Activity />;
            case "Settings":
                return <Settings />;
            case "Profile":
                return <UserCircle />;
            default:
                return <LayoutDashboard />;
        }
    };

    const handleLogoutClick = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
            <div className="logo-container">
                <BriefcaseBusiness className="logo-icon" size={24} />
                <span className="logo-text">Sales CRM</span>
                <button className="close-sidebar-btn" onClick={onCloseMobile} aria-label="Close Sidebar">
                    <X size={20} />
                </button>
            </div>

            <nav>
                {links.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={onCloseMobile}
                    >
                        {getIcon(item.name)}
                        <span className="link-text">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogoutClick}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
