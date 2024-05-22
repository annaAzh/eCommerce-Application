export function checkContainOneSpecialCharacter(str: string): boolean {
  const regex = /[\!\@\#\$\%\^\&\*]/;
  return !regex.test(str);
}
