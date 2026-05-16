import AppCard from "../../../shared/components/AppCard";

import { getUnit } from "../utils/uploadUtils";

export default function BillForm({ formData, setFormData, billType }) {
  // =========================
  // UPDATE
  // =========================

  const update = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // =========================
  // INPUT STYLE
  // =========================

  const input = `
    w-full
    border
    border-gray-300
    dark:border-gray-700
    bg-white
    dark:bg-gray-800
    text-gray-800
    dark:text-white
    rounded-md
    px-3
    py-2
    text-sm
    focus:ring-2
    focus:ring-blue-500
    focus:outline-none
    transition
  `;

  const label = `
    text-sm
    text-gray-600
    dark:text-gray-300
  `;

  return (
    <AppCard className="max-w-2xl mx-auto">
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >
        {/* BILL TYPE */}

        <div className="md:col-span-2">
          <label className={label}>Bill Type</label>

          <input value={formData.bill_type} disabled className={input} />
        </div>

        {/* PERIOD FROM */}

        <div>
          <label className={label}>Period From</label>

          <input
            type="date"
            className={input}
            value={formData.period_from}
            onChange={(e) => update("period_from", e.target.value)}
          />
        </div>

        {/* PERIOD TO */}

        <div>
          <label className={label}>Period To</label>

          <input
            type="date"
            className={input}
            value={formData.period_to}
            onChange={(e) => update("period_to", e.target.value)}
          />
        </div>

        {/* CONSUMPTION */}

        {billType !== "other" && (
          <div className="md:col-span-2">
            <label className={label}>Consumption</label>

            <div
              className="
                flex
                gap-2
              "
            >
              <input
                className={input}
                value={formData.consumption}
                onChange={(e) => update("consumption", e.target.value)}
              />

              <span
                className="
                  flex
                  items-center
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {getUnit(billType)}
              </span>
            </div>
          </div>
        )}

        {/* DUE DATE */}

        <div>
          <label className={label}>Due Date</label>

          <input
            type="date"
            className={input}
            value={formData.due_date}
            onChange={(e) => update("due_date", e.target.value)}
          />
        </div>

        {/* AMOUNT */}

        <div>
          <label className={label}>Amount</label>

          <div
            className="
              flex
              gap-2
            "
          >
            <input
              className={input}
              value={formData.amount}
              onChange={(e) => update("amount", e.target.value)}
            />

            <span
              className="
                flex
                items-center
                text-gray-500
                dark:text-gray-400
              "
            >
              CHF
            </span>
          </div>
        </div>

        {/* PAID */}

        <div
          className="
            md:col-span-2
            flex
            items-center
            gap-2
          "
        >
          <input
            type="checkbox"
            className="
              w-4
              h-4
              rounded
              border-gray-300
              dark:border-gray-600
              text-blue-500
              focus:ring-blue-500
              dark:bg-gray-800
            "
            checked={formData.is_paid}
            onChange={(e) => update("is_paid", e.target.checked)}
          />

          <label
            className="
              text-sm
              text-gray-700
              dark:text-gray-300
            "
          >
            Paid
          </label>
        </div>

        {/* NOTES */}

        <div className="md:col-span-2">
          <label className={label}>Notes</label>

          <textarea
            className={`${input} min-h-[80px]`}
            value={formData.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>
      </div>
    </AppCard>
  );
}
