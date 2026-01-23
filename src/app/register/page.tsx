'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { registerApi } from '../../../lib/api'
import Link from 'next/link'

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
            await registerApi({ name, email, phone, password })
            router.push('/login')
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan saat mendaftar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Dekoratif Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[120px] -z-10 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-xl bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-14"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4"
                    >
                        Join The Excellence
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                        Create <span className="text-blue-600">Account.</span>
                    </h1>
                    <p className="text-slate-500 mt-4 font-medium italic">
                        Mulailah perjalanan perawatan pakaian kelas dunia Anda.
                    </p>
                </div>

                {/* Error Handling */}
                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl"
                        >
                            <p className="text-sm text-red-600 font-bold">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-800"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-800"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+62"
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-800"
                        />
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
                            Security Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-800"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 w-full py-5 mt-4 rounded-2xl bg-blue-600 text-white font-black tracking-widest uppercase text-xs shadow-[0_20px_40px_-12px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Create Experience'}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        Sudah menjadi bagian dari kami?{' '}
                        <Link
                            href="/login"
                            className="text-blue-600 font-black hover:underline ml-1"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}