export function checkContainOneUppercaseLetter(str: string): boolean {
  const regex = /[A-Z]/;
  return !regex.test(str);
}
