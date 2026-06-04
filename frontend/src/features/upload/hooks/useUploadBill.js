import { useState } from "react";
import { extractBill } from "../../../services/billService";
import { mapParsedToForm } from "../utils/uploadUtils";

export function useUploadBill() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("select");

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    amount: "",
    consumption: "",
    notes: "",
  });

  const processFile = async (selectedFile, billType) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setLoading(true);

    try {
      const data = await extractBill(selectedFile, billType);
      const parsed = data?.parsed || {};

      setFormData(mapParsedToForm(parsed, billType));
      setStep("preview");
    } catch (e) {
      console.error(e);
      alert("OCR failed");
    }

    setLoading(false);
  };

  return {
    file,
    previewUrl,
    loading,
    step,
    formData,
    setFormData,
    setStep,
    processFile,
    errors,
    setErrors,
  };
}
