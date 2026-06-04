import { useState } from "react";

import { createBill } from "../../services/billService";

import { useHousehold } from "../../shared/hooks/useHousehold";

import AppCard from "../../shared/components/AppCard";

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
    errors,
    setErrors,
    setStep,
    processFile,
  } = useUploadBill();

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {
    if (!selectedHousehold) {
      return alert("Select household first");
    }

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    await createBill(formData, file, selectedHousehold);

    window.location.href = "/bills";
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="max-w-3xl mx-auto">
      {/* SELECT */}

      {step === "select" && (
        <AppCard className="space-y-6">
          {/* TYPE */}

          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
            className="
              border
              border-gray-300
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              text-gray-800
              dark:text-white
              px-3
              py-2
              rounded-md
              w-full
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
          >
            <option value="electricity">Electricity</option>

            <option value="water">Water</option>

            <option value="heating">Heating</option>

            <option value="other">Other</option>
          </select>

          {/* DROPZONE */}

          <UploadDropzone
            loading={loading}
            onFile={(file) => processFile(file, billType)}
          />
        </AppCard>
      )}

      {/* PREVIEW */}

      {step === "preview" && (
        <div className="space-y-6">
          {/* FILE */}

          <FilePreview file={file} previewUrl={previewUrl} />

          {/* FORM */}

          <BillForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            billType={billType}
          />

          {/* ACTIONS */}

          <UploadActions
            onCancel={() => setStep("select")}
            onSave={handleSave}
            loading={loading}
            hasErrors={Object.values(errors).some(Boolean)}
          />
        </div>
      )}
    </div>
  );
}
