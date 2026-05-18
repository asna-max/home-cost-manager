export function formatDate(date, language = "en") {
  if (!date) return "";

  const locale = language === "de" ? "de-CH" : "en-US";

  return new Date(date).toLocaleDateString(locale);
}
