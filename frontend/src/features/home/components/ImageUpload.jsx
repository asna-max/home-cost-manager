export default function ImageUpload({
  preview,
  setPreview,
  formData,
  setFormData,
}) {
  return (
    <>
      <label>Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          setFormData({ ...formData, house_image: file });
          setPreview(URL.createObjectURL(file));
        }}
      />

      <div className="image-preview-container">
        {preview ? (
          <img src={preview} alt="House" />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
    </>
  );
}