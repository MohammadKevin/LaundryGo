'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()

        // SIMULASI REGISTER
        router.push('/login')
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center px-4">
            <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-700">
                    Daftar LaundryGo
                </h1>
                <p className="text-center text-slate-600 mt-1">
                    Buat akun baru
                </p>

                <form onSubmit={handleRegister} className="mt-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-4">
                    Sudah punya akun?{' '}
                    <a href="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}