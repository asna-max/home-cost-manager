import { FaUpload, FaCamera } from "react-icons/fa";

export default function UploadDropzone({ onFile, loading }) {
  return (
    <div className="space-y-6">
      {/* DROPZONE */}

      <div
        className="
          border-2
          border-dashed
          border-gray-300
          dark:border-gray-700
          rounded-xl
          p-10
          text-center
          bg-white
          dark:bg-gray-800
          cursor-pointer
          hover:border-blue-500
          hover:bg-blue-50
          dark:hover:bg-gray-700
          transition
        "
        onClick={() => document.getElementById("fileInput").click()}
        onDrop={(e) => {
          e.preventDefault();

          onFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* ICON */}

        <FaUpload
          className="
            mx-auto
            text-3xl
            text-gray-400
            dark:text-gray-500
            mb-3
          "
        />

        {/* TITLE */}

        <p
          className="
            text-gray-700
            dark:text-gray-200
            font-medium
          "
        >
          {loading ? "Processing..." : "Drag & Drop or Click"}
        </p>

        {/* SUBTITLE */}

        <p
          className="
            text-sm
            text-gray-400
            dark:text-gray-500
            mt-1
          "
        >
          PDF or Image
        </p>
      </div>

      {/* CAMERA */}

      <div
        className="
          border-2
          border-dashed
          border-green-300
          dark:border-green-700
          rounded-xl
          p-6
          text-center
          bg-green-50
          dark:bg-green-900/20
          cursor-pointer
          hover:bg-green-100
          dark:hover:bg-green-900/30
          transition
        "
        onClick={() => document.getElementById("cameraInput").click()}
      >
        {/* ICON */}

        <FaCamera
          className="
            mx-auto
            text-2xl
            text-green-600
            dark:text-green-400
            mb-2
          "
        />

        {/* TEXT */}

        <p
          className="
            text-green-700
            dark:text-green-300
            font-medium
          "
        >
          Take Photo
        </p>
      </div>

      {/* FILE INPUT */}

      <input
        id="fileInput"
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files[0])}
      />

      {/* CAMERA INPUT */}

      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onFile(e.target.files[0])}
      />
    </div>
  );
}
