"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
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

type Cabang = {
    id: number
    nama: string
    alamat: string
    telepon: string
}

function SidebarItem({
    icon: Icon,
    label,
    href
}: {
    icon: any
    label: string
    href: string
}) {
    const router = useRouter()
    const pathname = usePathname()
    const active = pathname === href

    return (
        <button
            onClick={() => router.push(href)}
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
    const [totalCabang, setTotalCabang] = useState(0)

    const loadCabang = () => {
        const stored = localStorage.getItem("cabangList")
        const list: Cabang[] = stored ? JSON.parse(stored) : []
        setTotalCabang(list.length)
    }

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
        loadCabang()

        const onStorage = () => loadCabang()
        window.addEventListener("storage", onStorage)
        window.addEventListener("cabang-updated", onStorage)

        return () => {
            window.removeEventListener("storage", onStorage)
            window.removeEventListener("cabang-updated", onStorage)
        }
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
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                        LG
                    </div>
                    <h1 className="text-xl font-bold">
                        LaundryGo <span className="text-blue-600">Admin</span>
                    </h1>
                </div>

                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard/admin" />
                    <SidebarItem icon={Store} label="Cabang" href="/dashboard/admin/branch" />
                    <SidebarItem icon={Users} label="Staff" href="/dashboard/admin/staff" />
                    <SidebarItem icon={ClipboardList} label="Gaji" href="/dashboard/admin/gaji" />
                    <SidebarItem icon={BarChart3} label="Laporan" href="/dashboard/admin/laporan" />
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
                        <h2 className="text-3xl font-bold">Halo, {user.username}</h2>
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
                        { title: "Total Cabang", value: totalCabang },
                        { title: "Total Staff", value: "18" },
                        { title: "Order Bulan Ini", value: "342" },
                        { title: "Pendapatan", value: "Rp 24jt" }
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
            </main>
        </div>
    )
}
