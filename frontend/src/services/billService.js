import { apiRequest } from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET BILLS
// =========================
export async function getBills(householdId) {
  try {
    const data = await apiRequest({
      endpoint: `${ENDPOINTS.BILLS.LIST}?household=${householdId}`,
    });

    // handle DRF pagination oder plain array
    return Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];
  } catch (err) {
    console.error("Failed to fetch bills:", err);
    return [];
  }
}

// =========================
// CREATE BILL
// =========================
export function createBill(data, file, householdId) {
  const formData = new FormData();

  // normale Felder
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Datei
  if (file) {
    formData.append("file", file);
  }

  // Haushalt
  formData.append("household", householdId);

  return apiRequest({
    endpoint: ENDPOINTS.BILLS.LIST,
    method: "POST",
    body: formData,
    isFormData: true,
  });
}

// =========================
// UPDATE BILL (PATCH)
// =========================
export function updateBill(id, data) {
  return apiRequest({
    endpoint: ENDPOINTS.BILLS.DETAIL(id),
    method: "PATCH",
    body: data,
  });
}

// =========================
// DELETE BILL
// =========================
export function deleteBill(id) {
  return apiRequest({
    endpoint: ENDPOINTS.BILLS.DETAIL(id),
    method: "DELETE",
  });
}

// =========================
// OCR EXTRACT
// =========================
export function extractBill(file, billType) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bill_type", billType);

  return apiRequest({
    endpoint: ENDPOINTS.BILLS.EXTRACT,
    method: "POST",
    body: formData,
    isFormData: true, // KEIN Content-Type setzen
  });
}
