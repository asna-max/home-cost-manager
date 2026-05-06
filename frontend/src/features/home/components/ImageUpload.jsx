export default function ImageUpload({
  preview,
  setPreview,
  formData,
  setFormData,
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">Image</label>

      <input
        type="file"
        accept="image/*"
        className="block w-full mt-2 text-sm"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          setFormData({ ...formData, house_image: file });
          setPreview(URL.createObjectURL(file));
        }}
      />

      <div className="mt-4 w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="House"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>
    </div>
  );
}
