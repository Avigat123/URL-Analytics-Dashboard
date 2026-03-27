import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function BrowserChart({ data }) {
    const chartData = Object.keys(data).map((key) => ({
        name: key,
        value: data[key]
    }));

    return (
        <div>
            <h3 className="font-bold mb-2">Browser Distribution</h3>
            <PieChart width={300} height={300}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={index} fill={["#a78bfa", "#6366f1", "#8b5cf6"][index % 3]} />
                    ))}
                </Pie>

                <Tooltip contentStyle={{ backgroundColor: "#1f1b3a", border: "none", color: "#fff" }} />

                <Legend wrapperStyle={{ color: "#ddd" }} />
            </PieChart>
        </div>
    );
}

export default BrowserChart;