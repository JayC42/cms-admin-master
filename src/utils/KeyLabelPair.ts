export interface KeyLabelPair {
  key: string;
  label: string;
}

export function keyToLabel(map: Map<string, string>, key: string, defaultValue = 'N/A'): string {
  return map.get(key) ?? defaultValue;
}
