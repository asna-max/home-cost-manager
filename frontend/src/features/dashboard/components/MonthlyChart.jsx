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

import AppCard from "../../../shared/components/AppCard";

import { useTheme } from "../../../shared/hooks/useTheme";

export default function MonthlyChart({ data }) {
  const { darkMode } = useTheme();

  return (
    <AppCard>
      {/* TITLE */}

      <h2
        className="
          text-lg
          font-semibold
          text-gray-800
          dark:text-white
          mb-6
        "
      >
        Monthly Utility Costs
      </h2>

      {/* EMPTY */}

      {data.length === 0 ? (
        <div
          className="
            text-sm
            text-gray-400
            dark:text-gray-500
          "
        >
          No monthly data available
        </div>
      ) : (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              {/* GRID */}

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#374151" : "#E5E7EB"}
              />

              {/* X AXIS */}

              <XAxis
                dataKey={(item) => `${item.month} ${item.year}`}
                tick={{
                  fill: darkMode ? "#D1D5DB" : "#374151",
                }}
              />

              {/* Y AXIS */}

              <YAxis
                tick={{
                  fill: darkMode ? "#D1D5DB" : "#374151",
                }}
              />

              {/* TOOLTIP */}

              <Tooltip
                formatter={(value) => `CHF ${Number(value).toFixed(2)}`}
                contentStyle={{
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",

                  border: darkMode ? "1px solid #374151" : "1px solid #E5E7EB",

                  color: darkMode ? "#FFFFFF" : "#111827",
                }}
              />

              {/* LEGEND */}

              <Legend
                wrapperStyle={{
                  color: darkMode ? "#FFFFFF" : "#111827",
                }}
              />

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
                stroke="#FB923C"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </AppCard>
  );
}
