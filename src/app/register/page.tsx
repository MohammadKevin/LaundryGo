'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Role } from '../../../lib/auth'

export default function RegisterPage() {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<Role>('USER')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]')

            if (users.find((u: any) => u.email === email)) {
                throw new Error('Email sudah terdaftar')
            }

            users.push({
                id: Date.now(),
                name,
                email,
                phone,
                password,
                role,
                createdAt: new Date().toISOString()
            })

            localStorage.setItem('users', JSON.stringify(users))
            router.push('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
            <motion.div className="w-full max-w-xl bg-white p-10 rounded-[2.5rem]">
                <h1 className="text-4xl font-black mb-6 text-center">
                    Create <span className="text-blue-600">Account</span>
                </h1>

                <AnimatePresence>
                    {error && (
                        <motion.div className="mb-4 text-red-600 font-bold text-center">
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleRegister} className="grid gap-5">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required />
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" required />

                    <select
                        value={role}
                        onChange={e => setRole(e.target.value as Role)}
                        className="px-4 py-3 rounded-xl bg-slate-100 font-semibold"
                    >
                        <option value="USER">User</option>
                        <option value="STAFF">Staff</option>
                        <option value="KURIR">Kurir</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPERADMIN">Super Admin</option>
                    </select>

                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />

                    <button disabled={loading} className="py-4 bg-blue-600 text-white font-black rounded-xl">
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold">Login</Link>
                </p>
            </motion.div>
        </div>
    )
}
