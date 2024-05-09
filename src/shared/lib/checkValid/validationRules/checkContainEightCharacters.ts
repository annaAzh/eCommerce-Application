export function checkContainEightCharacters(str: string): boolean {
  const regex = /.{8,}/;
  return !regex.test(str);
}
