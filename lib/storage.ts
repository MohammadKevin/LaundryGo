export function getData<T>(key: string): T | null {
  if (typeof window === "undefined") return null

  const data = localStorage.getItem(key)
  if (!data) return null

  try {
    return JSON.parse(data) as T
  } catch {
    return null
  }
}

export function setData<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}