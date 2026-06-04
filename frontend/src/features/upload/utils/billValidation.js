export function validateAmount(value) {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return "Please enter a valid amount";
  }

  if (num <= 0) {
    return "Amount must be greater than 0";
  }

  if (num > 1000000) {
    return "Amount is too large";
  }

  return "";
}

export function validateConsumption(value) {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return "Please enter a valid consumption";
  }

  if (num <= 0) {
    return "Consumption must be greater than 0";
  }

  if (num > 1000000) {
    return "Consumption is too large";
  }

  return "";
}

export function validateNotes(value) {
  if (value.length > 500) {
    return "Notes cannot exceed 500 characters";
  }

  return "";
}
