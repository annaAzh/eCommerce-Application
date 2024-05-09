export function checkTrailingSpaces(str: string): boolean {
  const regex = /^(?!\s).*(?<!\s)$/;
  return !regex.test(str);
}
