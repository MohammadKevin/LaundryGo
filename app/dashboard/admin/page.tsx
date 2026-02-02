"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    LayoutDashboard,
    Store,
    Users,
    ClipboardList,
    BarChart3,
    LogOut,
    Bell,
    Search
} from "lucide-react"

type User = {
    username: string
    role: string
}

function SidebarItem({
    icon: Icon,
    label,
    active = false,
    onClick
}: {
    icon: any
    label: string
    active?: boolean
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                ${active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
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

        const parsed: User = JSON.parse(storedUser)
        if (parsed.role !== "admin") {
            router.push("/dashboard/user")
            return
        }

        setUser(parsed)
    }, [router])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-400 animate-pulse">
                Loading admin dashboard...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900">
            <aside className="fixed h-screen w-72 border-r bg-white px-8 py-10">
                <div className="mb-12 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
                        LG
                    </div>
                    <h1 className="text-xl font-bold">
                        LaundryGo <span className="text-blue-600">Admin</span>
                    </h1>
                </div>

                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={Store} label="Cabang" />
                    <SidebarItem icon={Users} label="Staff" />
                    <SidebarItem icon={ClipboardList} label="Gaji" />
                    <SidebarItem icon={BarChart3} label="Laporan" />
                </nav>

                <div className="absolute bottom-10 left-8 right-8">
                    <button
                        onClick={() => {
                            localStorage.removeItem("authUser")
                            router.push("/")
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="ml-72 flex-1 p-12">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Halo, {user.username}
                        </h2>
                        <p className="text-slate-500">
                            Ringkasan aktivitas LaundryGo hari ini
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="rounded-full border bg-white p-2 text-slate-400 hover:text-blue-600">
                            <Search size={20} />
                        </button>
                        <button className="rounded-full border bg-white p-2 text-slate-400 hover:text-blue-600">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                <div className="mb-12 grid gap-6 md:grid-cols-4">
                    {[
                        { title: "Total Cabang", value: "5" },
                        { title: "Total Staff", value: "18" },
                        { title: "Order Bulan Ini", value: "342" },
                        { title: "Pendapatan", value: "Rp 24jt" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border bg-white p-6 shadow-sm"
                        >
                            <p className="text-sm text-slate-400">{item.title}</p>
                            <p className="mt-2 text-3xl font-bold">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b p-6">
                        <h3 className="font-bold">Order Terbaru</h3>
                        <button className="text-sm font-semibold text-blue-600">
                            Lihat semua
                        </button>
                    </div>

                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-400">
                            <tr>
                                <th className="px-6 py-4 text-left">Customer</th>
                                <th className="px-6 py-4">Cabang</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {[
                                { name: "Andi", cabang: "Depok", status: "Proses", total: "45.000" },
                                { name: "Budi", cabang: "Bogor", status: "Selesai", total: "72.000" },
                            ].map((o, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium">{o.name}</td>
                                    <td className="px-6 py-4">{o.cabang}</td>
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold">
                                        Rp {o.total}
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
