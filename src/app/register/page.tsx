'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerApi } from '../../../lib/api'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await registerApi({
                name,
                email,
                phone,
                password
            })

            router.push('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-400 to-cyan-300 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-700">
                        Buat Akun LaundryGo
                    </h1>
                    <p className="text-slate-600 mt-1">
                        Daftar untuk mulai pakai layanan kami
                    </p>
                </div>

                {error && (
                    <p className="mb-4 text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nomor Telepon
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg
                        hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50"
                    >
                        {loading ? 'Mendaftar...' : 'Daftar'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Sudah punya akun?{' '}
                    <a
                        href="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}
