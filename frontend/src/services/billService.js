import api from "./api/axios";

import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET BILLS
// =========================

export async function getBills(householdId) {
  try {
    const response = await api.get(
      `${ENDPOINTS.BILLS.LIST}?household=${householdId}`,
    );

    const data = response.data;

    // DRF pagination OR array
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

export async function createBill(data, file, householdId) {
  const formData = new FormData();

  // NORMAL FIELDS
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // FILE
  if (file) {
    formData.append("file", file);
  }

  // HOUSEHOLD
  formData.append("household", householdId);

  const response = await api.post(ENDPOINTS.BILLS.LIST, formData);

  return response.data;
}

// =========================
// UPDATE BILL
// =========================

export async function updateBill(id, data) {
  const response = await api.patch(ENDPOINTS.BILLS.DETAIL(id), data);

  return response.data;
}

// =========================
// DELETE BILL
// =========================

export async function deleteBill(id) {
  await api.delete(ENDPOINTS.BILLS.DETAIL(id));
}

// =========================
// OCR EXTRACT
// =========================

export async function extractBill(file, billType) {
  const formData = new FormData();

  formData.append("file", file);

  formData.append("bill_type", billType);

  const response = await api.post(ENDPOINTS.BILLS.EXTRACT, formData);

  return response.data;
}
