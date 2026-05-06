import { getUnit } from "../utils/uploadUtils";

export default function BillForm({ formData, setFormData, billType }) {
  const update = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const input =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500";

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="col-span-2">
        <label className="text-sm text-gray-600">Bill Type</label>
        <input value={formData.bill_type} disabled className={input} />
      </div>

      <div>
        <label className="text-sm text-gray-600">Period From</label>
        <input
          type="date"
          className={input}
          value={formData.period_from}
          onChange={(e) => update("period_from", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Period To</label>
        <input
          type="date"
          className={input}
          value={formData.period_to}
          onChange={(e) => update("period_to", e.target.value)}
        />
      </div>

      {billType !== "other" && (
        <div className="col-span-2">
          <label className="text-sm text-gray-600">Consumption</label>
          <div className="flex gap-2">
            <input
              className={input}
              value={formData.consumption}
              onChange={(e) => update("consumption", e.target.value)}
            />
            <span className="flex items-center text-gray-500">
              {getUnit(billType)}
            </span>
          </div>
        </div>
      )}

      <div>
        <label className="text-sm text-gray-600">Due Date</label>
        <input
          type="date"
          className={input}
          value={formData.due_date}
          onChange={(e) => update("due_date", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Amount</label>
        <div className="flex gap-2">
          <input
            className={input}
            value={formData.amount}
            onChange={(e) => update("amount", e.target.value)}
          />
          <span className="flex items-center text-gray-500">CHF</span>
        </div>
      </div>

      <div className="col-span-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.is_paid}
          onChange={(e) => update("is_paid", e.target.checked)}
        />
        <label>Paid</label>
      </div>

      <div className="col-span-2">
        <label className="text-sm text-gray-600">Notes</label>
        <textarea
          className={`${input} min-h-[80px]`}
          value={formData.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </div>
  );
}