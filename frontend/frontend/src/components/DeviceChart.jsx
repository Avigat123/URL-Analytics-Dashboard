import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#064E3B"];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-[#3F3F46] rounded-lg px-3 py-2 text-sm shadow-lg">
                <p className="text-[#FAFAFA] font-medium">{payload[0].name}</p>
                <p className="text-[#10B981]">{payload[0].value} clicks</p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload, total }) => {
    return (
        <div className="flex flex-col gap-1.5 mt-3">
            {payload.map((entry, index) => {
                const pct = total > 0 ? ((entry.payload.value / total) * 100).toFixed(1) : 0;
                return (
                    <div key={index} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                            <span
                                className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-[#A1A1AA] capitalize">{entry.value}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-[#FAFAFA] font-medium tabular-nums">{entry.payload.value}</span>
                            <span className="text-[#3F3F46] w-10 text-right tabular-nums">{pct}%</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

function DeviceChart({ data }) {
    const chartData = Object.keys(data).map((key) => ({
        name: key,
        value: data[key],
    }));

    const total = chartData.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#FAFAFA]">Devices</h3>
                <span className="text-xs text-[#A1A1AA] tabular-nums">{total} total</span>
            </div>

            <div className="relative flex justify-center">
                <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={2}
                            strokeWidth={0}
                        >
                            {chartData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-[#FAFAFA] tabular-nums">{total}</span>
                    <span className="text-xs text-[#A1A1AA]">visits</span>
                </div>
            </div>

            <CustomLegend payload={chartData.map((d, i) => ({ value: d.name, color: COLORS[i % COLORS.length], payload: d }))} total={total} />
        </div>
    );
}

export default DeviceChart;
