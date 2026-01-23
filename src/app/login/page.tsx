'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { loginApi } from '../../../lib/api'
import Link from 'next/link'

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

            // Premium Redirect Logic
            const routes: Record<string, string> = {
                'ADMIN': '/dashboard/admin',
                'STAFF': '/dashboard/laundry',
                'USER': '/dashboard/user'
            }
            
            router.push(routes[res.user.role] || '/')
            
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Kredensial tidak valid')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/40 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[440px] bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] p-10 md:p-12"
            >
                {/* Brand Identity */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20 mx-auto">
                            L
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Welcome <span className="text-blue-600">Back.</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Masuk ke portal eksklusif LaundryGo
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-center"
                        >
                            <p className="text-sm text-red-600 font-bold">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-800 placeholder:text-slate-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                                Password
                            </label>
                            <Link href="#" className="text-[10px] font-black text-blue-600 tracking-widest uppercase hover:underline">
                                Forgot?
                            </Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-800 placeholder:text-slate-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black tracking-[0.2em] uppercase text-xs shadow-xl hover:bg-blue-600 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        Belum memiliki akses?{' '}
                        <Link
                            href="/register"
                            className="text-blue-600 font-black hover:underline ml-1"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}