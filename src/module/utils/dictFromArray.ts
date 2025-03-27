export function dictFromArray<T extends string>(arr: readonly string[]) {
  type Dict = Record<T, T>;
  return arr.reduce((acc, key) => {
    acc[key as keyof Dict] = key as any;
    return acc;
  }, {} as Dict);
}
