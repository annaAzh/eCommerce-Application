export function checkContainOneDigit(str: string): boolean {
  const regex = /[\!\@\#\$\%\^\&\*]/;
  return !regex.test(str);
}
