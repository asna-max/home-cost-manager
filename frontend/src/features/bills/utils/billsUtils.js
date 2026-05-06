export const getYears = (bills) => {
  return [
    ...new Set(
      bills
        .filter((b) => b.period_from)
        .map((b) => new Date(b.period_from).getFullYear()),
    ),
  ].sort((a, b) => b - a);
};

export const filterBills = (bills, filters) => {
  const { type, status, year } = filters;

  return bills.filter((bill) => {
    if (type !== "all" && bill.bill_type !== type) return false;
    if (status === "paid" && !bill.is_paid) return false;
    if (status === "unpaid" && bill.is_paid) return false;

    if (year !== "all" && bill.period_from) {
      const y = new Date(bill.period_from).getFullYear().toString();
      if (y !== year) return false;
    }

    return true;
  });
};
