'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            name,
            email,
            phone,
            password,
        }

        console.log(data)
        router.push('/login')
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

                <form onSubmit={handleRegister} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            placeholder="Nama kamu"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            text-slate-900 placeholder:text-slate-600
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="contoh@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            text-slate-900 placeholder:text-slate-600
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nomor Telepon
                        </label>
                        <input
                            type="tel"
                            placeholder="08xxxxxxxxxx"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            text-slate-900 placeholder:text-slate-600
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Minimal 8 karakter"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300
                            text-slate-900 placeholder:text-slate-600
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg
                        hover:bg-blue-700 active:scale-[0.98] transition"
                    >
                        Daftar
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
