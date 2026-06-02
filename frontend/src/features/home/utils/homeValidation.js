export function validateRooms(value) {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return "Please enter a valid number";
  }

  if (num <= 0) {
    return "Rooms must be greater than 0";
  }

  if (num > 50) {
    return "Rooms cannot be greater than 50";
  }

  const isInteger = Number.isInteger(num);
  const isHalf = num % 1 === 0.5;

  if (!isInteger && !isHalf) {
    return "Only whole numbers or .5 values are allowed";
  }

  return "";
}

export function validateYear(value, fieldName) {
  if (!value) {
    return "";
  }

  const currentYear = new Date().getFullYear();

  if (value < 1800) {
    return `${fieldName} cannot be less than 1800`;
  }

  if (value > currentYear) {
    return `${fieldName} cannot be greater than ${currentYear}`;
  }

  return "";
}
