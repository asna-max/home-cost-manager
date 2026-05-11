import { useNavigate } from "react-router-dom";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("de-CH");
}

function formatType(type) {
  if (!type) return "";

  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function RecentBills({ bills }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-5">
      {/* TITLE */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Bills</h2>

        <button
          onClick={() => navigate("/bills")}
          className="text-sm text-blue-500 hover:underline"
        >
          View all
        </button>
      </div>

      {/* EMPTY */}
      {bills.length === 0 ? (
        <div className="text-sm text-gray-400">No recent bills</div>
      ) : (
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="
                border
                rounded-lg
                p-4
                transition
                hover:border-blue-200
              "
            >
              {/* TOP */}
              <div className="flex items-center justify-between">
                {/* LEFT */}
                <div>
                  {/* TITLE */}
                  <h3 className="font-medium text-gray-800">
                    {bill.title || formatType(bill.bill_type)}
                  </h3>

                  {/* PERIOD */}
                  {bill.period_from && bill.period_to && (
                    <p className="text-sm text-gray-500">
                      {formatDate(bill.period_from)} —{" "}
                      {formatDate(bill.period_to)}
                    </p>
                  )}
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  {/* AMOUNT */}
                  <p className="font-semibold text-gray-800">
                    CHF {Number(bill.amount || 0).toFixed(2)}
                  </p>

                  {/* STATUS */}
                  <span
                    className={`
                      text-xs
                      px-2
                      py-1
                      rounded-full
                      ${
                        bill.is_paid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {bill.is_paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
