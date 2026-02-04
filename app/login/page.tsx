"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const users = [
    { username: "kevin", password: "123456", role: "admin" },
    { username: "lepiw", password: "123456", role: "admin" },
    { username: "dipta", password: "12345", role: "staff" },
    { username: "nendra", password: "12345", role: "staff" },
    { username: "anton", password: "12345", role: "kurir" },
    { username: "gibran", password: "12345", role: "user" },
]

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        const foundUser = users.find(
            (user) =>
                user.username === username &&
                user.password === password
        )

        if (!foundUser) {
            setError("Username atau password salah")
            return
        }

        localStorage.setItem("authUser", JSON.stringify(foundUser))
        router.push(`/dashboard/${foundUser.role}`)
    }

    const handleGoogleLogin = () => {
        const googleUser = {
            username: "google-user",
            role: "user",
        }

        localStorage.setItem("authUser", JSON.stringify(googleUser))
        router.push("/dashboard/user")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Selamat Datang
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Masuk ke akun Anda untuk melanjutkan
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
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
                            placeholder="••••••••"
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
                        Login
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">ATAU</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-5 w-5"
                    />
                    Login dengan Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Belum punya akun?{" "}
                    <span
                        onClick={() => router.push("/register")}
                        className="cursor-pointer font-medium text-blue-700 hover:underline"
                    >
                        Daftar
                    </span>
                </p>

                <p className="mt-8 text-center text-xs text-gray-400">
                    © 2026 LaundryGo. All rights reserved.
                </p>
            </div>
        </div>
    )
}
