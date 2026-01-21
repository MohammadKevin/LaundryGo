const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('token')
            : null

    const headers: HeadersInit = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'API Error')
    }

    return data
}

export async function loginApi(data: {
    email: string
    password: string
}) {
    return apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}

export async function registerApi(data: {
    name: string
    email: string
    phone: string
    password: string
}) {
    return apiFetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}
