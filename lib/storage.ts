export function getData<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function setData<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}
