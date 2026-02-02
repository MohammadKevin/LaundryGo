"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
    username: string
    role: string
}

export default function UserDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser")

        if (!storedUser) {
            router.push("/login")
            return
        }

        const parsedUser: User = JSON.parse(storedUser)

        if (parsedUser.role !== "user") {
            router.push(`/dashboard/${parsedUser.role}`)
            return
        }

        setUser(parsedUser)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-500">
                Loading user dashboard...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
            <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-10 py-5 shadow-sm">
                <h1 className="text-xl font-semibold tracking-wide text-blue-600">
                    Laundry<span className="text-slate-900">Go</span>
                </h1>

                <button
                    onClick={() => {
                        localStorage.removeItem("authUser")
                        router.push("/")
                    }}
                    className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            <main className="p-10">
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold">
                        Halo,{" "}
                        <span className="text-blue-600">
                            {user.username}
                        </span>{" "}
                        👋
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Selamat datang di LaundryGo
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            title: "Pesanan Aktif",
                            value: 2,
                            color: "blue",
                        },
                        {
                            title: "Riwayat Pesanan",
                            value: 8,
                            color: "indigo",
                        },
                        {
                            title: "Total Pengeluaran",
                            value: "Rp 120.000",
                            color: "cyan",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="relative rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <h3 className="text-sm text-slate-500">
                                {item.title}
                            </h3>
                            <p
                                className={`mt-3 text-3xl font-bold text-${item.color}-600`}
                            >
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 rounded-xl border bg-white p-8 shadow-sm">
                    <h3 className="mb-6 text-lg font-semibold">
                        Pesanan Terakhir
                    </h3>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-slate-500">
                                <th className="pb-3">Tanggal</th>
                                <th>Layanan</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    date: "01 Feb 2026",
                                    service: "Cuci + Setrika",
                                    status: "Diproses",
                                    color: "text-blue-600",
                                    total: "Rp 25.000",
                                },
                                {
                                    date: "28 Jan 2026",
                                    service: "Cuci Kering",
                                    status: "Selesai",
                                    color: "text-green-600",
                                    total: "Rp 40.000",
                                },
                                {
                                    date: "20 Jan 2026",
                                    service: "Setrika",
                                    status: "Selesai",
                                    color: "text-green-600",
                                    total: "Rp 15.000",
                                },
                            ].map((o, i) => (
                                <tr
                                    key={i}
                                    className="border-b last:border-none hover:bg-slate-50 transition"
                                >
                                    <td className="py-4">{o.date}</td>
                                    <td>{o.service}</td>
                                    <td className={`font-medium ${o.color}`}>
                                        {o.status}
                                    </td>
                                    <td className="font-medium">{o.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
