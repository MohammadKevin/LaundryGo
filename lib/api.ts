const API_URL = process.env.NEXT_PUBLIC_API_URL

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  name: string
  email: string
  phone: string
  password: string
}

/**
 * SAFE JSON PARSER (ANTI ERROR)
 */
async function parseResponse(res: Response) {
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

/**
 * LOGIN
 */
export async function loginApi(payload: LoginPayload) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await parseResponse(res)

  if (!res.ok) {
    throw new Error(data?.message || 'Login gagal')
  }

  return data as {
    message: string
    token: string
    user: {
      id: number
      name: string
      email: string
      role: 'ADMIN' | 'STAFF' | 'USER'
    }
  }
}

/**
 * REGISTER
 */
export async function registerApi(payload: RegisterPayload) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await parseResponse(res)

  if (!res.ok) {
    throw new Error(data?.message || 'Register gagal')
  }

  return data
}
