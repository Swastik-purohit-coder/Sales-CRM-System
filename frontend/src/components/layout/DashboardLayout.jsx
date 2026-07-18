import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./DashboardLayout.css";

const DashboardLayout = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileOpen(prev => !prev);
    };

    const closeMobileSidebar = () => {
        setIsMobileOpen(false);
    };

    return (
        <div className="dashboard-layout">
            {/* Mobile Sidebar backdrop overlay */}
            <div 
                className={`sidebar-overlay ${isMobileOpen ? "active" : ""}`} 
                onClick={closeMobileSidebar}
            />

            <Sidebar 
                isMobileOpen={isMobileOpen} 
                onCloseMobile={closeMobileSidebar} 
            />

            <div className="dashboard-main">
                <Navbar onToggleSidebar={toggleMobileSidebar} />

                <main className="dashboard-content-wrapper">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;