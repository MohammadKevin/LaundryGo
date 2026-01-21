'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginApi } from '../../../lib/api'

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await loginApi({ email, password })

            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))

            switch (res.user.role) {
                case 'ADMIN':
                    router.push('/dashboard/admin')
                    break
                case 'STAFF':
                    router.push('/dashboard/laundry')
                    break
                case 'USER':
                    router.push('/dashboard/user')
                    break
                default:
                    router.push('/')
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Login gagal')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-700">
                        LaundryGo
                    </h1>
                    <p className="text-slate-600 mt-1">
                        Login ke akun kamu
                    </p>
                </div>

                {error && (
                    <p className="mb-4 text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="contoh@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                                w-full px-4 py-3 rounded-xl
                                border border-slate-300
                                bg-white text-black
                                placeholder:text-black placeholder:opacity-100
                                focus:ring-2 focus:ring-blue-500
                                focus:outline-none
                            "
                            style={{ WebkitTextFillColor: 'black' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="
                                w-full px-4 py-3 rounded-xl
                                border border-slate-300
                                bg-white text-black
                                placeholder:text-black placeholder:opacity-100
                                focus:ring-2 focus:ring-blue-500
                                focus:outline-none
                            "
                            style={{ WebkitTextFillColor: 'black' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
                    >
                        {loading ? 'Masuk...' : 'Masuk'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Belum punya akun?{' '}
                    <a
                        href="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Daftar sekarang
                    </a>
                </p>
            </div>
        </div>
    )
}
