export function validateRooms(value) {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return "Please enter a valid number";
  }

  if (num <= 0) {
    return "Rooms must be greater than 0";
  }

  const isInteger = Number.isInteger(num);
  const isHalf = num % 1 === 0.5;

  if (!isInteger && !isHalf) {
    return "Only whole numbers or .5 values are allowed";
  }

  return "";
}
