"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
    username: string
    role: string
}

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")

        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsedUser: User = JSON.parse(storedUser)

        if (parsedUser.role !== "admin") {
            router.push("/dashboard/user")
            return
        }

        setUser(parsedUser)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 text-slate-400">
                Loading admin dashboard...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-white/5 px-10 py-5 backdrop-blur-xl">
                <h1 className="text-xl font-semibold tracking-wide">
                    Admin<span className="text-indigo-400">Panel</span>
                </h1>

                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/")
                    }}
                    className="rounded-xl bg-gradient-to-r from-rose-600 to-red-700 px-5 py-2 text-sm font-medium shadow-lg transition hover:scale-[1.03] hover:opacity-90"
                >
                    Logout
                </button>
            </header>

            <main className="p-10">
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold">
                        Selamat datang,{" "}
                        <span className="text-indigo-400">{user.username}</span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Anda login sebagai <b>Administrator</b>
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { title: "Total Users", value: 128, color: "indigo" },
                        { title: "Total Staff", value: 12, color: "emerald" },
                        { title: "Total Orders", value: 342, color: "amber" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <div
                                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-${item.color}-500/20 to-transparent`}
                            />

                            <h3 className="relative text-sm text-slate-400">
                                {item.title}
                            </h3>
                            <p className="relative mt-3 text-4xl font-bold tracking-tight">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
                    <h3 className="mb-6 text-lg font-semibold">
                        Data Pengguna
                    </h3>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-left text-slate-400">
                                <th className="pb-3">Username</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "kevin", role: "admin" },
                                { name: "dipta", role: "staff" },
                                { name: "gibran", role: "user" },
                            ].map((u, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-white/5 last:border-none hover:bg-white/5 transition"
                                >
                                    <td className="py-4 font-medium">
                                        {u.name}
                                    </td>
                                    <td className="capitalize">{u.role}</td>
                                    <td className="text-emerald-400 font-medium">
                                        Aktif
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
