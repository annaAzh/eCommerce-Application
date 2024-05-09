export function checkContainDomain(str: string): boolean {
  const regex = /\S+@\S+\.\S+/;
  return !regex.test(str);
}
