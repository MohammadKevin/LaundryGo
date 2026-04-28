"use client"

import { motion } from "framer-motion"
import { JSX, useState, ChangeEvent, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronLeft, Mail, Lock } from "lucide-react"

type FormState = {
    email: string
    password: string
}

type Role = "admin" | "pelanggan" | "kurir" | "staff"

type User = {
    email: string
    password: string
    role: Role
}

interface InputProps {
    label: string
    name: string
    icon: React.ReactNode
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
    showPasswordToggle?: boolean
    isPasswordVisible?: boolean
    onTogglePassword?: () => void
}

const dummyUsers: User[] = [
    { email: "admin@mail.com", password: "123", role: "admin" },
    { email: "user@mail.com", password: "123", role: "pelanggan" },
    { email: "kurir@mail.com", password: "123", role: "kurir" },
    { email: "staff@mail.com", password: "123", role: "staff" }
]

export default function LoginPage(): JSX.Element {
    const [form, setForm] = useState<FormState>({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const user = dummyUsers.find(
            u => u.email === form.email && u.password === form.password
        )

        if (!user) {
            alert("Email atau password salah")
            return
        }

        localStorage.setItem("user", JSON.stringify(user))

        if (user.role === "admin") router.push("/admin")
        if (user.role === "pelanggan") router.push("/pelanggan")
        if (user.role === "kurir") router.push("/kurir")
        if (user.role === "staff") router.push("/staff")
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#f8fafc] px-6 text-slate-800 overflow-hidden">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

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
                        <p className="mt-3 text-slate-500 font-medium">Selamat datang kembali!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            icon={<Mail className="w-4 h-4" />}
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            icon={<Lock className="w-4 h-4" />}
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            showPasswordToggle
                            isPasswordVisible={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                        />

                        <div className="flex justify-end">
                            <a href="#" className="text-xs font-bold text-sky-600 hover:text-sky-700">
                                Lupa Password?
                            </a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 font-bold text-white shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all"
                        >
                            Masuk
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500 font-medium">
                        Belum punya akun{" "}
                        <Link href="/register" className="text-sky-600 hover:text-sky-700 font-bold underline-offset-4 hover:underline">
                            Daftar sekarang
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function Input({
    label,
    name,
    icon,
    value,
    onChange,
    type = "text",
    placeholder,
    showPasswordToggle,
    isPasswordVisible,
    onTogglePassword
}: InputProps): JSX.Element {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                {label}
            </label>
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
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all placeholder:text-slate-300"
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
                    >
                        {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
        </div>
    )
}