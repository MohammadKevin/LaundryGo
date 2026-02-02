"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!username || !email || !phone || !password) {
            setError("Semua field wajib diisi")
            return
        }

        const existingUsers =
            JSON.parse(localStorage.getItem("registeredUsers") || "[]")

        const userExists = existingUsers.find(
            (user: any) =>
                user.username === username || user.email === email
        )

        if (userExists) {
            setError("Username atau Email sudah digunakan")
            return
        }

        const newUser = {
            username,
            email,
            phone,
            password,
            role: "user",
        }

        existingUsers.push(newUser)
        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(existingUsers)
        )

        setSuccess("Registrasi berhasil! Silakan login.")
        setUsername("")
        setEmail("")
        setPhone("")
        setPassword("")

        setTimeout(() => {
            router.push("/login")
        }, 1200)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Buat Akun
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Daftar untuk mulai menggunakan LaundryGo
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-600">
                        {success}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            No. Telp
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPhone(e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white hover:bg-blue-800 active:scale-[0.98]"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-gray-400">
                    Sudah punya akun?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className="cursor-pointer text-blue-700 hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}
