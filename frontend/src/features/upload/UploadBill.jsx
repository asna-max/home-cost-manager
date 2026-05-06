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
    if (!selectedHousehold) {
      alert("Select household first");
      return;
    }

    try {
      await createBill(formData, file, selectedHousehold);
      alert("Saved!");
      window.location.href = "/bills";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {step === "select" && (
        <>
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
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
        </>
      )}

      {step === "preview" && (
        <>
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
        </>
      )}
    </div>
  );
}
