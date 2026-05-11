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

export function buildDistributionData(bills) {
  return [
    {
      name: "Electricity",
      value: sumByType(bills, "electricity"),
      color: "#FACC15",
    },
    {
      name: "Water",
      value: sumByType(bills, "water"),
      color: "#06B6D4",
    },
    {
      name: "Heating",
      value: sumByType(bills, "heating"),
      color: "#EF4444",
    },
    {
      name: "Other",
      value: sumByType(bills, "other"),
      color: "#FB923C",
    },
  ].filter((item) => item.value > 0);
}

export function buildDistributionStats(distributionData, monthlyData) {
  // MOST EXPENSIVE UTILITY
  const mostExpensive = distributionData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    distributionData[0],
  );

  // MONTH TOTALS
  const monthTotals = monthlyData.map((month) => ({
    ...month,

    total: month.electricity + month.water + month.heating + month.other,
  }));

  // HIGHEST MONTH
  const highestMonth = monthTotals.reduce(
    (max, month) => (month.total > max.total ? month : max),
    monthTotals[0],
  );

  // LOWEST MONTH
  const lowestMonth = monthTotals.reduce(
    (min, month) => (month.total < min.total ? month : min),
    monthTotals[0],
  );

  return {
    mostExpensive,
    highestMonth,
    lowestMonth,
  };
}
