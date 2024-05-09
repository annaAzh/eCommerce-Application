export function checkContainOneLowercaseLetter(str: string): boolean {
  const regex = /[a-z]/;
  return !regex.test(str);
}
