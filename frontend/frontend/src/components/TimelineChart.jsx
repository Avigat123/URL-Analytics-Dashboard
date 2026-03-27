import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function TimelineChart({ data }) {
    const chartData = Object.keys(data).map((date) => ({
        date,
        clicks: data[date]
    }));

    return (
        <div>
            <h3 className="font-bold mb-2">Clicks Over Time</h3>
            <LineChart width={500} height={300} data={chartData}>
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f1b3a", border: "none", color: "#fff" }} />
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="clicks" stroke="#a78bfa" strokeWidth={2} />
            </LineChart>
        </div>
    );
}

export default TimelineChart;