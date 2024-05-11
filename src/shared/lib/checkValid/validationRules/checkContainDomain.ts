export function checkContainDomain(str: string): boolean {
  const regex = /@\S+\.\S+/;
  return !regex.test(str);
}
