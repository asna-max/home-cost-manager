export default function ImageUpload({
  preview,
  setPreview,
  formData,
  setFormData,
}) {
  // =========================
  // IMAGE CHANGE
  // =========================

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

      <label
        className="
          block
          text-sm
          font-medium
          text-gray-600
          dark:text-gray-300
          mb-2
        "
      >
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
          dark:text-gray-300
          file:mr-4
          file:px-4
          file:py-2
          file:rounded-lg
          file:border-0
          file:bg-blue-50
          dark:file:bg-gray-700
          file:text-blue-600
          dark:file:text-white
          file:font-medium
          hover:file:bg-blue-100
          dark:hover:file:bg-gray-600
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
          dark:bg-gray-900
          border
          border-dashed
          border-gray-300
          dark:border-gray-700
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
            <p
              className="
                text-sm
                text-gray-400
                dark:text-gray-500
              "
            >
              No image selected
            </p>

            <p
              className="
                text-xs
                text-gray-300
                dark:text-gray-600
                mt-1
              "
            >
              PNG, JPG, WEBP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
