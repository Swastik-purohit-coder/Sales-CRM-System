import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Moon, Sun, ChevronDown, User, Settings, LogOut } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { useThemeContext } from "../../context/ThemeContext";
import notificationService from "../../services/notificationService";
import NotificationBell from "../notifications/NotificationBell";
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useThemeContext();

    const [unread, setUnread] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        loadUnread();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-dropdown-container")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const loadUnread = async () => {
        try {
            const res = await notificationService.getUnread();
            const data = res.data?.data || res.data;
            setUnread(data.count || 0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogoutClick = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleProfileClick = () => {
        const path = user?.role?.toLowerCase() === "admin" ? "/profile" : "/sales/profile";
        navigate(path);
        setIsDropdownOpen(false);
    };

    const handleSettingsClick = () => {
        if (user?.role?.toLowerCase() === "admin") {
            navigate("/admin/settings");
        }
        setIsDropdownOpen(false);
    };

    const handleNotificationsClick = () => {
        const path = user?.role?.toLowerCase() === "admin" ? "/notifications" : "/sales/notifications";
        navigate(path);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                    <Menu size={24} />
                </button>
                <div className="search-wrapper">
                    <Search className="search-icon" />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search Leads..." 
                    />
                </div>
            </div>

            <div className="navbar-right">
                {/* Theme Toggle */}
                <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notification Bell */}
                <NotificationBell
                    unread={unread}
                    onClick={handleNotificationsClick}
                />

                {/* Profile Section */}
                <div className="profile-dropdown-container">
                    <button 
                        className="profile-trigger" 
                        onClick={() => setIsDropdownOpen(prev => !prev)}
                        aria-expanded={isDropdownOpen}
                    >
                        <img 
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=2563EB&color=fff`} 
                            alt="User avatar" 
                            className="avatar-circle" 
                        />
                        <div className="user-meta">
                            <span className="user-name">{user?.fullName || "User"}</span>
                            <span className="user-role-badge">{user?.role}</span>
                        </div>
                        <ChevronDown className="chevron-icon" />
                    </button>

                    <div className={`dropdown-menu ${isDropdownOpen ? "active" : ""}`}>
                        <div className="dropdown-header">Account Options</div>
                        <button className="dropdown-item" onClick={handleProfileClick}>
                            <User size={16} />
                            <span>My Profile</span>
                        </button>
                        {user?.role?.toLowerCase() === "admin" && (
                            <button className="dropdown-item" onClick={handleSettingsClick}>
                                <Settings size={16} />
                                <span>Settings</span>
                            </button>
                        )}
                        <button className="dropdown-item danger" onClick={handleLogoutClick}>
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;