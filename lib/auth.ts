export type UserRole = 'ADMIN' | 'STAFF' | 'USER'

export type User = {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  user: Omit<User, 'password'>
}

export async function loginApi(
  payload: LoginPayload
): Promise<LoginResponse> {

  const users: User[] = JSON.parse(
    localStorage.getItem('users') || '[]'
  )

  const user = users.find(
    (u) => u.email === payload.email && u.password === payload.password
  )

  if (!user) {
    throw new Error('Email atau password salah')
  }

  const { password, ...safeUser } = user

  return {
    token: crypto.randomUUID(),
    user: safeUser
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
