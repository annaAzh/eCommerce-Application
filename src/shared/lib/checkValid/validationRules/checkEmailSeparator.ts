export function checkEmailSeparator(str: string): boolean {
  const regex = /.*@.*/;
  return !regex.test(str);
}
