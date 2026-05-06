export function isFormDirty(formData, originalData) {
  if (!formData || !originalData) return false;

  const clean = (obj) => ({
    ...obj,
    house_image: null,
  });

  return (
    JSON.stringify(clean(formData)) !== JSON.stringify(clean(originalData)) ||
    formData.house_image !== null
  );
}
