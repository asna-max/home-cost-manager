import { useState } from "react";
import { createBill } from "../../services/billService";
import { useHousehold } from "../../shared/hooks/useHousehold";

import { useUploadBill } from "./hooks/useUploadBill";
import UploadDropzone from "./components/UploadDropzone";
import FilePreview from "./components/FilePreview";
import BillForm from "./components/BillForm";
import UploadActions from "./components/UploadActions";

export default function UploadBill() {
  const { selectedHousehold } = useHousehold();
  const [billType, setBillType] = useState("electricity");

  const {
    file,
    previewUrl,
    loading,
    step,
    formData,
    setFormData,
    setStep,
    processFile,
  } = useUploadBill();

  const handleSave = async () => {
    if (!selectedHousehold) return alert("Select household first");

    await createBill(formData, file, selectedHousehold);
    window.location.href = "/bills";
  };

  return (
    <div className="max-w-3xl mx-auto">
      {step === "select" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="electricity">Electricity</option>
            <option value="water">Water</option>
            <option value="heating">Heating</option>
            <option value="other">Other</option>
          </select>

          <UploadDropzone
            loading={loading}
            onFile={(file) => processFile(file, billType)}
          />
        </div>
      )}

      {step === "preview" && (
        <div className="space-y-6">
          <FilePreview file={file} previewUrl={previewUrl} />

          <BillForm
            formData={formData}
            setFormData={setFormData}
            billType={billType}
          />

          <UploadActions
            onCancel={() => setStep("select")}
            onSave={handleSave}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}