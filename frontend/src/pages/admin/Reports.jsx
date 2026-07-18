import { useEffect, useState } from "react";

import dashboardService from "../../services/analyticsService";

import {
    DashboardCards,
    DateRangeFilter,
    SalesChart,
    RevenueChart,
    LeadConversionChart,
    PerformanceTable,
    ReportSkeleton,
    EmptyReport,
} from "../../components/reports";

import ExportCSVButton from "../../components/reports/ExportCSVButton";
import ExportPDFButton from "../../components/reports/ExportPDFButton";
import "../../components/reports/reports.css";

const Reports = () => {

    const [loading, setLoading] = useState(true);

    const [range, setRange] = useState("MONTH");

    const [stats, setStats] = useState({});

    const [sales, setSales] = useState([]);

    const [revenue, setRevenue] = useState([]);

    const [conversion, setConversion] = useState([]);

    const [performance, setPerformance] = useState([]);

    useEffect(() => {

        loadReports();

    }, [range]);

    const loadReports = async () => {

        setLoading(true);

        try {

            const res =
                await dashboardService.getDashboard();

            const data =
                res.data?.data || res.data;

            setStats(data.stats || {});

            setSales(data.sales || []);

            setRevenue(data.revenue || []);

            setConversion(
                data.conversion || []
            );

            setPerformance(
                data.performance || []
            );

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const exportCSV = () => {

        alert("CSV Export");

    };

    const exportPDF = () => {

        alert("PDF Export");

    };

    if (loading)
        return <ReportSkeleton />;

    if (!sales.length)
        return <EmptyReport />;

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>

                        Reports & Analytics

                    </h1>

                    <p>

                        CRM Performance Dashboard

                    </p>

                </div>

                <div className="report-actions">

                    <DateRangeFilter
                        value={range}
                        onChange={setRange}
                    />

                    <ExportCSVButton
                        onExport={exportCSV}
                    />

                    <ExportPDFButton
                        onExport={exportPDF}
                    />

                </div>

            </div>

            <DashboardCards
                stats={stats}
            />

            <SalesChart
                data={sales}
            />

            <RevenueChart
                data={revenue}
            />

            <LeadConversionChart
                data={conversion}
            />

            <PerformanceTable
                executives={performance}
            />

        </div>

    );

};

export default Reports;