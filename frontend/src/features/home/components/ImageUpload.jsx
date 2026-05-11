export default function ImageUpload({
  preview,
  setPreview,
  formData,
  setFormData,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      house_image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      {/* LABEL */}
      <label className="block text-sm font-medium text-gray-600 mb-2">
        House Image
      </label>

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        className="
          block
          w-full
          text-sm
          text-gray-600
          file:mr-4
          file:px-4
          file:py-2
          file:rounded-lg
          file:border-0
          file:bg-blue-50
          file:text-blue-600
          file:font-medium
          hover:file:bg-blue-100
          cursor-pointer
        "
        onChange={handleImageChange}
      />

      {/* PREVIEW */}
      <div
        className="
          mt-5
          w-full
          h-64
          bg-gray-50
          border
          border-dashed
          border-gray-300
          rounded-2xl
          overflow-hidden
          flex
          items-center
          justify-center
          transition
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="House Preview"
            className="
              w-full
              h-full
              object-contain
            "
          />
        ) : (
          <div className="text-center">
            <p className="text-gray-400 text-sm">No image selected</p>

            <p className="text-xs text-gray-300 mt-1">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
}
