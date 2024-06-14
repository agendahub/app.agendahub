export function prettyPercent(value: number) {
  return `${(value % 1).toFixed(2).replace(".", ",")}%`;
}
