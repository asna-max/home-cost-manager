export default function UploadDropzone({ onFile, loading }) {
  return (
    <div className="upload-container">
      {/* ================= DROPZONE ================= */}
      <div
        className="upload-dropzone"
        onClick={() => document.getElementById("fileInput").click()}
        onDrop={(e) => {
          e.preventDefault();
          onFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="upload-icon"></div>
        <div className="upload-text">
          {loading ? "Processing..." : "Drag & Drop or Click"}
        </div>
        <div className="upload-subtext">PDF or Image</div>
      </div>

      {/* ================= CAMERA ================= */}
      <div
        className="camera-box"
        onClick={() => document.getElementById("cameraInput").click()}
      >
        <div className="camera-icon"></div>
        <div>Take Photo</div>
      </div>

      {/* ================= INPUTS ================= */}
      <input
        id="fileInput"
        type="file"
        accept="application/pdf,image/*"
        style={{ display: "none" }}
        onChange={(e) => onFile(e.target.files[0])}
      />

      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => onFile(e.target.files[0])}
      />
    </div>
  );
}
