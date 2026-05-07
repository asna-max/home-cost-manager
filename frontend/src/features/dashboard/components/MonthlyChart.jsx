import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function MonthlyChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Monthly Utility Costs
      </h2>

      {/* EMPTY */}
      {data.length === 0 ? (
        <div className="text-gray-400 text-sm">No monthly data available</div>
      ) : (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              {/* GRID */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X */}
              <XAxis dataKey={(item) => `${item.month} ${item.year}`} />

              {/* Y */}
              <YAxis />

              {/* TOOLTIP */}
              <Tooltip
                formatter={(value) => `CHF ${Number(value).toFixed(2)}`}
              />

              {/* LEGEND */}
              <Legend />

              {/* ELECTRICITY */}
              <Line
                type="monotone"
                dataKey="electricity"
                stroke="#FACC15"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              {/* WATER */}
              <Line
                type="monotone"
                dataKey="water"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              {/* HEATING */}
              <Line
                type="monotone"
                dataKey="heating"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              {/* OTHER */}
              <Line
                type="monotone"
                dataKey="other"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
