export function NnumberFormat(number: number) {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
