export function formatCurrency(amount, currency = "CHF") {
  return `${currency} ${Number(amount || 0).toFixed(2)}`;
}
