function normalizeType(type) {
  if (!type) return "other";

  const value = type.toLowerCase();

  if (value.includes("electric")) {
    return "electricity";
  }

  if (value.includes("water")) {
    return "water";
  }

  if (value.includes("heat")) {
    return "heating";
  }

  return "other";
}

function sumBills(bills) {
  return bills.reduce((sum, bill) => sum + Number(bill.total_amount || 0), 0);
}

function sumByType(bills, targetType) {
  return bills
    .filter((bill) => normalizeType(bill.type) === targetType)
    .reduce((sum, bill) => sum + Number(bill.total_amount || 0), 0);
}

export function buildSummary(bills) {
  return {
    total: sumBills(bills),

    electricity: sumByType(bills, "electricity"),

    water: sumByType(bills, "water"),

    heating: sumByType(bills, "heating"),

    other: sumByType(bills, "other"),
  };
}
