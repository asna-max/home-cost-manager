import AppCard from "../../../shared/components/AppCard";

export default function FilePreview({ file, previewUrl }) {
  // =========================
  // EMPTY
  // =========================

  if (!file) return null;

  // =========================
  // PREVIEW
  // =========================

  return (
    <AppCard className="max-w-3xl mx-auto">
      {/* IMAGE */}

      {file.type?.includes("image") ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="
            w-full
            rounded-lg
            object-contain
            max-h-[600px]
          "
        />
      ) : (
        /* PDF */

        <iframe
          src={previewUrl}
          title="PDF Preview"
          className="
            w-full
            h-[600px]
            rounded-lg
          "
        />
      )}
    </AppCard>
  );
}
