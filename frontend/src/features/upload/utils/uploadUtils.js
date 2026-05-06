export const getUnit = (billType) => {
  if (billType === "electricity" || billType === "heating") return "kWh";
  if (billType === "water") return "m³";
  return "";
};

export const mapParsedToForm = (parsed, billType) => {
  return {
    bill_type: billType,
    amount: parsed.amount ?? "",
    due_date: parsed.due_date ?? "",
    consumption:
      parsed.consumption_kwh || parsed.consumption_m3 || "",
    period_from: parsed.period_from ?? "",
    period_to: parsed.period_to ?? "",
    is_paid: false,
    notes: "",
  };
};