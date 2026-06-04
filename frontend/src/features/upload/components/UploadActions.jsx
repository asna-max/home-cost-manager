export default function UploadActions({
  onCancel,
  onSave,
  loading,
  hasErrors,
}) {
  return (
    <div
      className="
        flex
        justify-between
        items-center
        mt-6
      "
    >
      {/* CANCEL */}

      <button
        onClick={onCancel}
        className="
          px-4
          py-2
          bg-gray-200
          dark:bg-gray-700
          text-gray-700
          dark:text-gray-200
          rounded-md
          hover:bg-gray-300
          dark:hover:bg-gray-600
          transition
        "
      >
        Cancel
      </button>

      {/* SAVE */}

      <button
        onClick={onSave}
        disabled={loading || hasErrors}
        className="
          px-6
          py-2
          bg-blue-500
          hover:bg-blue-600
          text-white
          rounded-md
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Saving..." : "Confirm & Save"}
      </button>
    </div>
  );
}
