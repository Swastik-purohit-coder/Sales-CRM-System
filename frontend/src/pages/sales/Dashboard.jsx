import { useEffect, useState } from "react";
import analyticsService from "../../services/analyticsService";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardTable from "../../components/dashboard/DashboardTable";
import DashboardLoadingState from "../../components/dashboard/DashboardLoadingState";
import SalesDashboardWelcome from "../../components/dashboard/SalesDashboardWelcome";
import useAuth from "../../hooks/useAuth";

const SalesDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await analyticsService.overview();
            setDashboard(data);
        } catch (err) {
            console.error("Failed to load sales dashboard:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <DashboardLoadingState />;
    }

    return (
        <div className="dashboard-page">
            <SalesDashboardWelcome user={user} />

            <div className="dashboard-cards">
                <DashboardStatCard
                    title="My Leads"
                    value={dashboard?.overview?.totalLeads || 0}
                />

                <DashboardStatCard
                    title="My Pending Leads"
                    value={dashboard?.overview?.activeLeads || 0}
                />

                <DashboardStatCard
                    title="My Converted Leads"
                    value={dashboard?.overview?.wonLeads || 0}
                />

                <DashboardStatCard
                    title="My Follow-ups"
                    value={dashboard?.overview?.todayFollowUps || 0}
                />
            </div>

            <DashboardTable
                title="My Recent Leads"
                leads={dashboard?.recentLeads}
            />
        </div>
    );
};

export default SalesDashboard;
