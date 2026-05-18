export function formatCurrency(amount, currency = "CHF", language = "en") {
  const locale = language === "de" ? "de-CH" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",

    currency,
  }).format(amount || 0);
}
