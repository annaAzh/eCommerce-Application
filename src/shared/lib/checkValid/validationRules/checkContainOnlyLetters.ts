export function checkContainOnlyLetters(str: string): boolean {
  const regex = /^[A-Za-z]+$/;
  return !regex.test(str);
}
