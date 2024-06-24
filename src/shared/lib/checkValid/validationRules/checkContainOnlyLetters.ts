export function checkContainOnlyLetters(str: string): boolean {
  const regex = /^(?!\s)[A-Za-z\s]+$/;
  return !regex.test(str);
}
