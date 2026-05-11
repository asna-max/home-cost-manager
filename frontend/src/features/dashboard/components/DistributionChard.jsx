import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function DistributionChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Cost Distribution
      </h2>

      {/* EMPTY */}
      {data.length === 0 ? (
        <div className="text-gray-400 text-sm">
          No distribution data available
        </div>
      ) : (
        <>
          <>
            {/* TOP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* CHART */}
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {data.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => `CHF ${Number(value).toFixed(2)}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LEGEND */}
              <div className="space-y-5">
                {data.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span className="text-lg text-gray-700">{item.name}</span>
                    </div>

                    {/* VALUE */}
                    <span className="text-lg font-semibold text-gray-800">
                      CHF {Number(item.value).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t my-6" />

            {/* STATS PLACEHOLDER */}
            <div className="space-y-3 text-sm text-gray-600">
              <p>Most expensive utility: —</p>

              <p>Highest month: —</p>

              <p>Lowest month: —</p>
            </div>
          </>
        </>
      )}
    </div>
  );
}
