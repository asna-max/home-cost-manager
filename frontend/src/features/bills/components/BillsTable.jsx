import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { API_BASE } from "../../../services/api/apiClient";

export default function BillsTable({ bills, onDelete, onToggle }) {
  if (!bills.length) {
    return (
      <div className="text-gray-500 text-center py-10">No bills found</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3">From</th>
            <th className="px-4 py-3">To</th>
            <th className="px-4 py-3">Due</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Notes</th>
            <th className="px-4 py-3">View</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Delete</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3 capitalize">{bill.bill_type}</td>
              <td className="px-4 py-3">{bill.period_from}</td>
              <td className="px-4 py-3">{bill.period_to}</td>
              <td className="px-4 py-3">{bill.due_date}</td>
              <td className="px-4 py-3 font-medium">CHF {bill.amount}</td>
              <td className="px-4 py-3">{bill.notes || "-"}</td>

              {/* VIEW */}
              <td className="px-4 py-3 text-center">
                {bill.file ? (
                  <a
                    href={`${API_BASE}${bill.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <FaEye />
                  </a>
                ) : (
                  "-"
                )}
              </td>

              {/* STATUS */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onToggle(bill)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md
                    ${
                      bill.is_paid
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                  {bill.is_paid ? <FaCheck /> : <FaTimes />}
                </button>
              </td>

              {/* DELETE */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onDelete(bill.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
