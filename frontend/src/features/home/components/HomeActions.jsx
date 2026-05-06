export default function HomeActions({
  isOwner,
  isDirty,
  saving,
  cancel,
  save,
  remove,
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      {/* LEFT */}
      <div>
        {isOwner && (
          <button
            onClick={remove}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex gap-3">
        <button
          onClick={cancel}
          disabled={!isDirty}
          className="px-4 py-2 bg-gray-00 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={save}
          disabled={!isDirty || saving}
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
