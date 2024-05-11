export function checkContainOneDigit(str: string): boolean {
  const regex = /\d/;
  return !regex.test(str);
}
