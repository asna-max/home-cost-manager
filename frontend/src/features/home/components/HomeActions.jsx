export default function HomeActions({
  isOwner,
  isDirty,
  saving,
  cancel,
  save,
  remove,
}) {
  return (
    <div className="form-actions">
      <div className="left-actions">
        {isOwner ? (
          <button className="delete-btn" onClick={remove}>
            Delete
          </button>
        ) : (
          <div className="delete-placeholder" />
        )}
      </div>

      <div className="right-actions">
        <button
          className="cancel-btn"
          onClick={cancel}
          disabled={!isDirty}
        >
          Cancel
        </button>

        <button
          className="confirm-btn"
          onClick={save}
          disabled={!isDirty || saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}