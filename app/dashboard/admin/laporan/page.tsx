"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Store,
    Users,
    ClipboardList,
    BarChart3,
    LogOut
} from "lucide-react"

type User = {
    username: string
    role: string
}

type Cabang = {
    id: number
    nama: string
}

type Staff = {
    id: number
    nama: string
    cabang: string
}

type Gaji = {
    id: number
    staffId: number
    staffNama: string
    bulan: string
    total: number
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
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
        ${active ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

export default function LaporanDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const [cabang, setCabang] = useState<Cabang[]>([])
    const [staff, setStaff] = useState<Staff[]>([])
    const [gaji, setGaji] = useState<Gaji[]>([])

    const loadAll = () => {
        setCabang(JSON.parse(localStorage.getItem("cabangList") || "[]"))
        setStaff(JSON.parse(localStorage.getItem("staffList") || "[]"))
        setGaji(JSON.parse(localStorage.getItem("gajiList") || "[]"))
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
        loadAll()

        window.addEventListener("storage", loadAll)
        window.addEventListener("cabang-updated", loadAll)
        window.addEventListener("staff-updated", loadAll)
        window.addEventListener("gaji-updated", loadAll)

        return () => {
            window.removeEventListener("storage", loadAll)
            window.removeEventListener("cabang-updated", loadAll)
            window.removeEventListener("staff-updated", loadAll)
            window.removeEventListener("gaji-updated", loadAll)
        }
    }, [router])

    const totalGaji = gaji.reduce((sum, g) => sum + g.total, 0)

    const gajiPerBulan: Record<string, number> = {}
    gaji.forEach(g => {
        gajiPerBulan[g.bulan] = (gajiPerBulan[g.bulan] || 0) + g.total
    })

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center text-slate-400">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-slate-100">
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
                    <SidebarItem icon={BarChart3} label="laporan" href="/dashboard/admin/laporan" />
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

            <main className="ml-72 flex-1 p-12 space-y-10">
                <h2 className="text-3xl font-bold">Laporan Sistem</h2>

                <div className="grid gap-6 md:grid-cols-4">
                    <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm text-slate-400">Total Cabang</p>
                        <p className="mt-2 text-3xl font-bold">{cabang.length}</p>
                    </div>
                    <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm text-slate-400">Total Staff</p>
                        <p className="mt-2 text-3xl font-bold">{staff.length}</p>
                    </div>
                    <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm text-slate-400">Total Gaji Dibayar</p>
                        <p className="mt-2 text-2xl font-bold">
                            Rp {totalGaji.toLocaleString()}
                        </p>
                    </div>
                    <div className="rounded-2xl border bg-white p-6">
                        <p className="text-sm text-slate-400">Periode Gaji</p>
                        <p className="mt-2 text-xl font-bold">
                            {Object.keys(gajiPerBulan).length}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border bg-white">
                    <div className="border-b p-6 font-bold">Rekap Gaji per Bulan</div>
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-400">
                            <tr>
                                <th className="px-6 py-4 text-left">Bulan</th>
                                <th className="px-6 py-4 text-right">Total Gaji</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {Object.entries(gajiPerBulan).map(([bulan, total]) => (
                                <tr key={bulan}>
                                    <td className="px-6 py-4 font-medium">{bulan}</td>
                                    <td className="px-6 py-4 text-right font-semibold">
                                        Rp {total.toLocaleString()}
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
