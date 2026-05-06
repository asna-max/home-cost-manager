export default function FilePreview({ file, previewUrl }) {
  if (!file) return null;

  return (
    <div style={{ maxWidth: "600px", marginBottom: "20px" }}>
      {file.type?.includes("image") ? (
        <img src={previewUrl} style={{ width: "100%" }} />
      ) : (
        <iframe
          src={previewUrl}
          style={{ width: "100%", height: "400px" }}
        />
      )}
    </div>
  );
}