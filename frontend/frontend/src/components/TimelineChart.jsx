import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm shadow-xl">
                <p className="text-[#A1A1AA] text-xs mb-1">{label}</p>
                <p className="text-[#10B981] font-semibold">
                    {payload[0].value} {payload[0].value === 1 ? "click" : "clicks"}
                </p>
            </div>
        );
    }
    return null;
};

function TimelineChart({ data }) {
    const chartData = Object.keys(data)
        .sort()
        .map((date) => ({
            date,
            clicks: data[date],
        }));

    const maxClicks = Math.max(...chartData.map((d) => d.clicks), 1);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-semibold text-[#FAFAFA]">Click Activity</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">Clicks over time</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs text-[#A1A1AA]">Clicks</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#27272A"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fill: "#71717A", fontSize: 11 }}
                        axisLine={{ stroke: "#27272A" }}
                        tickLine={false}
                        dy={8}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{ fill: "#71717A", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, maxClicks + 1]}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3F3F46", strokeWidth: 1 }} />

                    <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke="#10B981"
                        strokeWidth={2}
                        fill="url(#clickGradient)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#10B981", stroke: "#09090B", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TimelineChart;