import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import AppCard from "../../../shared/components/AppCard";

import { useTheme } from "../../../shared/hooks/useTheme";

export default function DistributionChart({ data, stats }) {
  const { darkMode } = useTheme();

  const total = data.reduce((sum, item) => sum + item.value, 0);

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
        Cost Distribution
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
          No distribution data available
        </div>
      ) : (
        <>
          {/* TOP */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
              items-center
            "
          >
            {/* CHART */}

            <div
              className="
                h-72
                flex
                items-center
                justify-center
              "
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={3}
                  >
                    {data.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => `CHF ${Number(value).toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",

                      border: darkMode
                        ? "1px solid #374151"
                        : "1px solid #E5E7EB",

                      color: darkMode ? "#FFFFFF" : "#111827",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}

            <div className="space-y-5">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  {/* LEFT */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        w-4
                        h-4
                        rounded-full
                      "
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span
                      className="
                        text-lg
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* VALUE */}

                  <span
                    className="
                      text-lg
                      font-semibold
                      text-gray-800
                      dark:text-white
                    "
                  >
                    {Math.round((item.value / total) * 100)} %
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}

          <div
            className="
              border-t
              border-gray-200
              dark:border-gray-700
              my-6
            "
          />

          {/* STATS */}

          <div
            className="
              space-y-4
              text-sm
            "
          >
            {/* MOST EXPENSIVE */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Most expensive utility
              </span>

              <span
                className="
                  font-medium
                  text-gray-800
                  dark:text-white
                "
              >
                {stats?.mostExpensive?.name}
              </span>
            </div>

            {/* HIGHEST MONTH */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Highest month
              </span>

              <span
                className="
                  font-medium
                  text-gray-800
                  dark:text-white
                "
              >
                {stats?.highestMonth?.month} {stats?.highestMonth?.year}
              </span>
            </div>

            {/* LOWEST MONTH */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Lowest month
              </span>

              <span
                className="
                  font-medium
                  text-gray-800
                  dark:text-white
                "
              >
                {stats?.lowestMonth?.month} {stats?.lowestMonth?.year}
              </span>
            </div>
          </div>
        </>
      )}
    </AppCard>
  );
}
