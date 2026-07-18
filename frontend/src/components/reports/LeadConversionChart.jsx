import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [

    "#16a34a",

    "#dc2626",

    "#2563eb",

    "#ca8a04",

];

const LeadConversionChart = ({
    data = [],
}) => {

    return (

        <div className="report-chart">

            <h3>

                Lead Conversion

            </h3>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="status"
                        outerRadius={120}
                    >

                        {data.map(
                            (entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index %
                                                COLORS.length
                                        ]
                                    }
                                />

                            )
                        )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default LeadConversionChart;