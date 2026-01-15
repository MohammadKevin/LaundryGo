'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        // SIMULASI LOGIN (NANTI DIGANTI BACKEND)
        if (role === 'ADMIN') router.push('/dashboard/admin')
        if (role === 'LAUNDRY') router.push('/dashboard/laundry')
        if (role === 'USER') router.push('/dashboard/user')
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center px-4">
            <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-700">
                    Login LaundryGo
                </h1>
                <p className="text-center text-slate-600 mt-1">
                    Masuk ke akun kamu
                </p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <select
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="USER">User</option>
                        <option value="LAUNDRY">Laundry</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-4">
                    Belum punya akun?{' '}
                    <a href="/register" className="text-blue-600 font-semibold hover:underline">
                        Daftar
                    </a>
                </p>
            </div>
        </div>
    )
}