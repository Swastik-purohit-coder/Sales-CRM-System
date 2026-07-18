import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const RevenueChart = ({
    data = [],
}) => {

    return (

        <div className="report-chart">

            <h3>

                Revenue Trend

            </h3>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <AreaChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#16a34a"
                        fill="#86efac"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

};

export default RevenueChart;