import { getUnit } from "../utils/uploadUtils";

export default function BillForm({ formData, setFormData, billType }) {
  const update = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="form-grid">
      <label>Bill Type:</label>
      <input value={formData.bill_type} disabled />

      <label>Period From:</label>
      <input
        type="date"
        value={formData.period_from}
        onChange={(e) => update("period_from", e.target.value)}
      />

      <label>Period To:</label>
      <input
        type="date"
        value={formData.period_to}
        onChange={(e) => update("period_to", e.target.value)}
      />

      {billType !== "other" && (
        <>
          <label>Consumption:</label>
          <div className="input">
            <input
              value={formData.consumption}
              onChange={(e) => update("consumption", e.target.value)}
            />
            <span className="unit">{getUnit(billType)}</span>
          </div>
        </>
      )}

      <label>Due Date:</label>
      <input
        type="date"
        value={formData.due_date}
        onChange={(e) => update("due_date", e.target.value)}
      />

      <label>Amount:</label>
      <div className="input">
        <input
          value={formData.amount}
          onChange={(e) => update("amount", e.target.value)}
        />
        <span className="unit">CHF</span>
      </div>

      <label>Paid:</label>
      <input
        type="checkbox"
        checked={formData.is_paid}
        onChange={(e) => update("is_paid", e.target.checked)}
      />

      <label>Notes:</label>
      <textarea
        value={formData.notes}
        onChange={(e) => update("notes", e.target.value)}
      />
    </div>
  );
}