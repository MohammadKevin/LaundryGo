'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { loginApi } from '../../../lib/auth'

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await loginApi({ email, password })

            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))

            const routes: Record<string, string> = {
                ADMIN: '/dashboard/admin',
                SUPERADMIN: '/dashboard/admin',
                STAFF: '/dashboard/laundry',
                USER: '/dashboard/user',
                KURIR: '/dashboard/laundry'
            }

            router.push(routes[res.user.role] || '/')
        } catch (err: any) {
            setError(err.message || 'Login gagal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
            <motion.div className="w-full max-w-md bg-white p-10 rounded-[2.5rem]">
                <h1 className="text-3xl font-black text-center mb-6">
                    Welcome <span className="text-blue-600">Back</span>
                </h1>

                <AnimatePresence>
                    {error && (
                        <motion.div className="mb-4 text-red-600 font-bold text-center">
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-slate-100"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-slate-100"
                    />

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-slate-900 text-white font-black rounded-xl"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-blue-600 font-bold">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
