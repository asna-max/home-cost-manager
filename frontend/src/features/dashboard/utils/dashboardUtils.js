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
  return bills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
}

function sumByType(bills, targetType) {
  return bills
    .filter((bill) => normalizeType(bill.bill_type) === targetType)
    .reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
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

export function buildMonthlyData(bills) {
  const months = {};

  bills.forEach((bill) => {
    if (!bill.period_from) return;

    const date = new Date(bill.period_from);

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    // CREATE MONTH
    if (!months[monthKey]) {
      months[monthKey] = {
        month: date.toLocaleString("default", {
          month: "short",
        }),

        year: date.getFullYear(),

        monthIndex: date.getMonth(),

        electricity: 0,
        water: 0,
        heating: 0,
        other: 0,
      };
    }

    const type = normalizeType(bill.bill_type);

    months[monthKey][type] += Number(bill.amount || 0);
  });

  return Object.values(months).sort((a, b) => {
    // YEAR
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    // MONTH
    return a.monthIndex - b.monthIndex;
  });
}
