import { useEffect, useState } from "react";

import analyticsService from "../../services/analyticsService";

import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardChartPanel from "../../components/dashboard/DashboardChartPanel";
import DashboardTable from "../../components/dashboard/DashboardTable";
import DashboardLoadingState from "../../components/dashboard/DashboardLoadingState";
import SalesDashboardWelcome from "../../components/dashboard/SalesDashboardWelcome";

const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await analyticsService.overview();

            setDashboard(res.data || res);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <DashboardLoadingState />;

    }

    return (

        <div className="dashboard-page">

            <SalesDashboardWelcome user={dashboard?.user} />

            <div className="dashboard-cards">

                <DashboardStatCard
                    title="Total Leads"
                    value={dashboard?.cards?.totalLeads}
                />

                <DashboardStatCard
                    title="New Leads"
                    value={dashboard?.cards?.newLeads}
                />

                <DashboardStatCard
                    title="Won"
                    value={dashboard?.cards?.wonLeads}
                />

                <DashboardStatCard
                    title="Lost"
                    value={dashboard?.cards?.lostLeads}
                />

            </div>

            <DashboardChartPanel dashboard={dashboard} />

            <DashboardTable
                title="Recent Leads"
                leads={dashboard?.recentLeads}
            />

        </div>

    );

};

export default Dashboard;