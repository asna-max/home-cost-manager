import { useState, useEffect } from "react";
import { extractBill, createBill } from "../services/billService";

export default function UploadBill({ selectedHousehold }) {
  const [billType, setBillType] = useState("electricity");
  const [step, setStep] = useState("select");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bill_type: "",
    amount: "",
    due_date: "",
    consumption: "",
    period_from: "",
    period_to: "",
    is_paid: false,
    notes: "",
  });

  const getUnit = () => {
    if (billType === "electricity" || billType === "heating") return "kWh";
    if (billType === "water") return "m³";
    return "";
  };

  // =========================
  // CLEANUP
  // =========================
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // =========================
  // OCR PROCESS
  // =========================
  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setLoading(true);

    try {
      const data = await extractBill(selectedFile, billType);

      setFormData({
        bill_type: billType,
        amount: data?.parsed?.amount || "",
        due_date: data?.parsed?.due_date || "",
        consumption: data?.parsed?.consumption || "",
        period_from: data?.parsed?.period_from || "",
        period_to: data?.parsed?.period_to || "",
        is_paid: false,
        notes: "",
      });

      setStep("preview");
    } catch (err) {
      console.error("OCR error:", err);
      alert("OCR failed");
    }

    setLoading(false);
  };

  // =========================
  // FILE HANDLING
  // =========================
  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]);
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!selectedHousehold) {
      alert("Select household first");
      return;
    }

    setLoading(true);

    try {
      await createBill(formData, file, selectedHousehold);
      alert("Bill saved!");
      window.location.href = "/bills";
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed");
    }

    setLoading(false);
  };

  // =========================
  // RESET
  // =========================
  const resetForm = () => {
    setStep("select");
    setFile(null);
    setPreviewUrl(null);

    setFormData({
      bill_type: billType,
      amount: "",
      due_date: "",
      consumption: "",
      period_from: "",
      period_to: "",
      is_paid: false,
      notes: "",
    });
  };

  return (
    <div>
      {/* ================= STEP 1 ================= */}
      {step === "select" && (
        <div>
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
          >
            <option value="electricity">Electricity</option>
            <option value="water">Water</option>
            <option value="heating">Heating</option>
            <option value="other">Other</option>
          </select>

          <div className="upload-container">
            {/* DROPZONE */}
            <div
              className="upload-dropzone"
              onClick={() => document.getElementById("fileInput").click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="upload-icon"></div>
              <div className="upload-text">
                {loading ? "Processing..." : "Drag & Drop or Click to Upload"}
              </div>
              <div className="upload-subtext">PDF or Image</div>
            </div>

            {/* CAMERA */}
            <div
              className="camera-box"
              onClick={() => document.getElementById("cameraInput").click()}
            >
              <div className="camera-icon"></div>
              <div>Take Photo</div>
            </div>
          </div>

          {/* Hidden Inputs */}
          <input
            id="fileInput"
            type="file"
            accept="application/pdf,image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <input
            id="cameraInput"
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === "preview" && (
        <div>
          <h3>Preview & Edit</h3>

          {/* FILE PREVIEW */}
          <div style={{ maxWidth: "600px", marginBottom: "20px" }}>
            {file?.type?.includes("image") ? (
              <img src={previewUrl} style={{ width: "100%" }} />
            ) : (
              <iframe
                src={previewUrl}
                style={{ width: "100%", height: "400px" }}
              />
            )}
          </div>

          {/* FORM */}
          <div className="form-grid">
            <label>Bill Type:</label>
            <div className="input">
              <input value={formData.bill_type} disabled />
            </div>

            <label>Period From:</label>
            <div className="input">
              <input
                type="date"
                value={formData.period_from}
                onChange={(e) =>
                  setFormData({ ...formData, period_from: e.target.value })
                }
              />
            </div>

            <label>Period To:</label>
            <div className="input">
              <input
                type="date"
                value={formData.period_to}
                onChange={(e) =>
                  setFormData({ ...formData, period_to: e.target.value })
                }
              />
            </div>

            {billType !== "other" && (
              <>
                <label>Consumption:</label>
                <div className="input">
                  <input
                    value={formData.consumption}
                    onChange={(e) =>
                      setFormData({ ...formData, consumption: e.target.value })
                    }
                  />
                  <span className="unit">{getUnit()}</span>
                </div>
              </>
            )}

            <label>Due Date:</label>
            <div className="input">
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
              />
            </div>

            <label>Amount:</label>
            <div className="input">
              <input
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <span className="unit">CHF</span>
            </div>

            <label>Paid:</label>
            <input
              type="checkbox"
              checked={formData.is_paid}
              onChange={(e) =>
                setFormData({ ...formData, is_paid: e.target.checked })
              }
            />

            <label>Notes:</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          {/* ACTIONS */}

          <div className="form-actions" style={{ marginTop: "20px" }}>
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
            <button
              className="confirm-btn"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Confirm & Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
