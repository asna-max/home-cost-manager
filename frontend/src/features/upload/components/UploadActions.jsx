export default function UploadActions({ onCancel, onSave, loading }) {
  return (
    <div className="form-actions" style={{ marginTop: "20px" }}>
      <button className="cancel-btn" onClick={onCancel}>
        Cancel
      </button>

      <button className="confirm-btn" onClick={onSave} disabled={loading}>
        {loading ? "Saving..." : "Confirm & Save"}
      </button>
    </div>
  );
}
