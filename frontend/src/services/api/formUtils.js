export function buildFormData(data) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === "" || value === null) return;

    if (typeof value === "boolean") {
      form.append(key, value ? "true" : "false");
    } else if (value instanceof File) {
      form.append(key, value);
    } else {
      form.append(key, value);
    }
  });

  return form;
}
