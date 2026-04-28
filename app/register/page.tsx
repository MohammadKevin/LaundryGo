"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { JSX, useState, ChangeEvent } from "react"
import { Eye, EyeOff, ChevronLeft, Phone, Mail, User, Lock } from "lucide-react"

type FormState = {
    name: string
    email: string
    phone: string
    countryCode: string
    password: string
    confirmPassword: string
}

interface InputProps {
    label: string
    name: string
    icon: React.ReactNode
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
}

interface PasswordProps {
    label: string
    name: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    show: boolean
    toggle: () => void
}

const countries = [
    { code: "+62", label: "🇮🇩 +62" },
    { code: "+1", label: "🇺🇸 +1" },
    { code: "+44", label: "🇬🇧 +44" },
    { code: "+81", label: "🇯🇵 +81" },
    { code: "+65", label: "🇸🇬 +65" }
]

export default function RegisterPage(): JSX.Element {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        phone: "",
        countryCode: "+62",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#f8fafc] px-6 py-12 text-slate-800 overflow-hidden">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

            <Link
                href="/"
                className="absolute left-6 top-8 flex items-center gap-2 group text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors"
            >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Kembali
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <div className="rounded-[2.5rem] border border-white bg-white/80 p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">
                            Laundry<span className="text-sky-400">Go</span>
                        </h1>
                        <p className="mt-3 text-slate-500 font-medium">Bergabunglah dan mulai mencuci tanpa ribet</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Nama Lengkap"
                            name="name"
                            icon={<User className="w-4 h-4" />}
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            icon={<Mail className="w-4 h-4" />}
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Nomor Telepon</label>
                            <div className="mt-2 flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100 transition-all">
                                <select
                                    name="countryCode"
                                    value={form.countryCode}
                                    onChange={handleChange}
                                    className="bg-slate-50 border-r border-slate-100 px-3 text-sm font-medium outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    {countries.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                                </select>
                                <div className="flex items-center px-3 text-slate-400">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full py-3.5 pr-4 text-sm outline-none placeholder:text-slate-300"
                                    placeholder="812 3456 789"
                                />
                            </div>
                        </div>

                        <PasswordInput
                            label="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            show={showPassword}
                            toggle={() => setShowPassword(!showPassword)}
                        />

                        <PasswordInput
                            label="Konfirmasi Password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            show={showConfirm}
                            toggle={() => setShowConfirm(!showConfirm)}
                        />

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full mt-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 font-bold text-white shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all"
                        >
                            Daftar Sekarang
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500 font-medium">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="text-sky-600 hover:text-sky-700 font-bold underline-offset-4 hover:underline">
                            Masuk di sini
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function Input({ label, name, icon, value, onChange, type = "text", placeholder }: InputProps): JSX.Element {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                    {icon}
                </div>
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all placeholder:text-slate-300"
                />
            </div>
        </div>
    )
}

function PasswordInput({ label, name, value, onChange, show, toggle }: PasswordProps): JSX.Element {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                    <Lock className="w-4 h-4" />
                </div>
                <input
                    name={name}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
                >
                    {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
        </div>
    )
}