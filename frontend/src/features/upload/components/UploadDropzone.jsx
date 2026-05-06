import { FaUpload, FaCamera } from "react-icons/fa";

export default function UploadDropzone({ onFile, loading }) {
  return (
    <div className="space-y-6">
      {/* DROPZONE */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        onClick={() => document.getElementById("fileInput").click()}
        onDrop={(e) => {
          e.preventDefault();
          onFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />

        <p className="text-gray-700 font-medium">
          {loading ? "Processing..." : "Drag & Drop or Click"}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          PDF or Image
        </p>
      </div>

      {/* CAMERA */}
      <div
        className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center bg-green-50 cursor-pointer hover:bg-green-100 transition"
        onClick={() => document.getElementById("cameraInput").click()}
      >
        <FaCamera className="mx-auto text-2xl text-green-600 mb-2" />
        <p className="text-green-700 font-medium">Take Photo</p>
      </div>

      {/* INPUTS */}
      <input
        id="fileInput"
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files[0])}
      />

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