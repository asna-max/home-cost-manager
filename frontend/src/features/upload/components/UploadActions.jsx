export default function UploadActions({ onCancel, onSave, loading }) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>

      <button
        onClick={onSave}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Confirm & Save"}
      </button>
    </div>
  );
}