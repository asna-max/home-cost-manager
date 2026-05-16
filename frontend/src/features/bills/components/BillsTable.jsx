import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

import { API_BASE } from "../../../services/api/axios";

import AppCard from "../../../shared/components/AppCard";

export default function BillsTable({ bills, onDelete, onToggle }) {
  // =========================
  // EMPTY
  // =========================

  if (!bills.length) {
    return (
      <div
        className="
          text-gray-500
          dark:text-gray-400
          text-center
          py-10
        "
      >
        No bills found
      </div>
    );
  }

  // =========================
  // TABLE
  // =========================

  return (
    <AppCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table
          className="
            w-full
            text-sm
          "
        >
          {/* HEADER */}

          <thead
            className="
              bg-gray-100
              dark:bg-gray-800
              text-gray-600
              dark:text-gray-300
              uppercase
              text-xs
            "
          >
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

          {/* BODY */}

          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill.id}
                className="
                  border-t
                  border-gray-200
                  dark:border-gray-700
                  hover:bg-gray-50
                  dark:hover:bg-gray-800
                  transition
                "
              >
                {/* TYPE */}

                <td
                  className="
                    px-4
                    py-3
                    capitalize
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {bill.bill_type}
                </td>

                {/* FROM */}

                <td
                  className="
                    px-4
                    py-3
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {bill.period_from}
                </td>

                {/* TO */}

                <td
                  className="
                    px-4
                    py-3
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {bill.period_to}
                </td>

                {/* DUE */}

                <td
                  className="
                    px-4
                    py-3
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {bill.due_date}
                </td>

                {/* AMOUNT */}

                <td
                  className="
                    px-4
                    py-3
                    font-medium
                    text-gray-800
                    dark:text-white
                  "
                >
                  CHF {bill.amount}
                </td>

                {/* NOTES */}

                <td
                  className="
                    px-4
                    py-3
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {bill.notes || "-"}
                </td>

                {/* VIEW */}

                <td className="px-4 py-3 text-center">
                  {bill.file ? (
                    <a
                      href={`${API_BASE}${bill.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-gray-500
                        dark:text-gray-400
                        hover:text-blue-500
                      "
                    >
                      <FaEye />
                    </a>
                  ) : (
                    <span
                      className="
                        text-gray-400
                        dark:text-gray-500
                      "
                    >
                      -
                    </span>
                  )}
                </td>

                {/* STATUS */}

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggle(bill)}
                    className={`
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                      rounded-md
                      transition
                      ${
                        bill.is_paid
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >
                    {bill.is_paid ? <FaCheck /> : <FaTimes />}
                  </button>
                </td>

                {/* DELETE */}

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDelete(bill.id)}
                    className="
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                      rounded-md
                      bg-red-100
                      text-red-600
                      hover:bg-red-200
                      transition
                    "
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppCard>
  );
}
