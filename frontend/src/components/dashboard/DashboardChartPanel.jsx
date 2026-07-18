import DashboardSectionCard from "./DashboardSectionCard";
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export const DashboardBarChart = ({
    data = [],
    xKey = "name",
    dataKey = "value",
    label,
}) => (
    <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} name={label} fill="#2563eb" />
        </BarChart>
    </ResponsiveContainer>
);

export const DashboardPieChart = ({
    data = [],
    nameKey = "name",
    valueKey = "value",
}) => (
    <ResponsiveContainer width="100%" height={280}>
        <PieChart>
            <Pie data={data} dataKey={valueKey} nameKey={nameKey} outerRadius={90}>
                {data.map((item, index) => (
                    <Cell key={item[nameKey] || index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    </ResponsiveContainer>
);

const DashboardChartPanel = ({
    dashboard,
}) => {
    return (
        <div className="dashboard-chart-grid">
            <DashboardSectionCard
                title="Lead Status"
            >
                {dashboard?.leadStatus && dashboard.leadStatus.length > 0 ? (
                    <DashboardPieChart 
                        data={dashboard.leadStatus} 
                        nameKey="status" 
                        valueKey="count" 
                    />
                ) : (
                    <p style={{ padding: "20px", color: "var(--text-muted)", textAlign: "center" }}>
                        No status statistics available
                    </p>
                )}
            </DashboardSectionCard>

            <DashboardSectionCard
                title="Lead Source"
            >
                {dashboard?.leadSource && dashboard.leadSource.length > 0 ? (
                    <DashboardBarChart 
                        data={dashboard.leadSource} 
                        xKey="source" 
                        dataKey="count" 
                        label="Leads from Source" 
                    />
                ) : (
                    <p style={{ padding: "20px", color: "var(--text-muted)", textAlign: "center" }}>
                        No source statistics available
                    </p>
                )}
            </DashboardSectionCard>
        </div>
    );
};

export default DashboardChartPanel;
