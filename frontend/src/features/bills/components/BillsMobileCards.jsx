import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

import { API_BASE } from "../../../services/api/axios";

import { useSettings } from "../../settings/hooks/useSettings";

import { formatCurrency } from "../../../shared/utils/formatCurrency";

import AppCard from "../../../shared/components/AppCard";

export default function BillsMobileCards({ bills, onDelete, onToggle }) {
  const { settings } = useSettings();

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <AppCard key={bill.id} className="p-4">
          {/* HEADER */}

          <div
            className="
              flex
              justify-between
              items-start
              mb-4
            "
          >
            <div>
              <h3
                className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                  capitalize
                "
              >
                {bill.bill_type}
              </h3>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Due: {bill.due_date || "-"}
              </p>
            </div>

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
          </div>

          {/* AMOUNT */}

          <div
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
              mb-3
            "
          >
            {formatCurrency(bill.amount, settings.currency, settings.language)}
          </div>

          {/* PERIOD */}

          <div
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
              mb-4
            "
          >
            {bill.period_from} → {bill.period_to}
          </div>

          {/* NOTES */}

          {bill.notes && (
            <p
              className="
                text-sm
                text-gray-600
                dark:text-gray-300
                mb-4
              "
            >
              {bill.notes}
            </p>
          )}

          {/* ACTIONS */}

          <div
            className="
              flex
              justify-end
              gap-3
            "
          >
            {bill.file && (
              <a
                href={`${API_BASE}${bill.file}`}
                target="_blank"
                rel="noreferrer"
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  rounded-md
                  bg-gray-100
                  dark:bg-gray-700
                  text-gray-600
                  dark:text-gray-300
                "
              >
                <FaEye />
              </a>
            )}

            <button
              onClick={() => onDelete(bill.id)}
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-md
                bg-red-100
                text-red-600
              "
            >
              <FaTrash />
            </button>
          </div>
        </AppCard>
      ))}
    </div>
  );
}
